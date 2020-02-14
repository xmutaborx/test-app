import * as React from 'react';
import {fromNullable, none, option, Option, some} from "fp-ts/lib/Option";
import {sequenceT} from "fp-ts/lib/Apply";

// ------------------------
const first: Option<number> = some(10);
const second: Option<number> = some(15);
const third: Option<number> = some(64);
const fourth: Option<number> = some(3);

const additionItems = (arr: Array<number>): number => {
    let result: number = 0;
    arr.map((item: number) => result += item);
    return result
};

const addNullableDeclarative = (a: Option<number>, b: Option<number>, c: Option<number>, d: Option<number>): Option<number> => {
    let counter: Option<number> = some(4);

    const sequence = sequenceT(option);

    const AB = sequence(a, b)
        .map(additionItems);
    const CD = sequence(c, d)
        .map(additionItems);

    const CDnonD = sequence(c, d.alt(some(0)))
        .chain(seq => counter.map(counterValue => seq[0] > counterValue ? seq[0] + counterValue : seq[0]));

    const CDnonC = sequence(c.alt(some(0)), d)
        .chain(seq => counter.map(counterValue => seq[1] < counterValue ? seq[1] + counterValue : seq[1]));

    console.log(AB);
    console.log(CD);
    console.log(CDnonD);
    console.log(CDnonC);

    return CD

};

console.log(addNullableDeclarative(first, second, third, fourth));
// -------------------------


const SESSION_KEY: string = `TEST_KEY`;
const DATA = [`some`, `other`, `test`];
const checkValueHOF = (arr: string[]) => (item: string): Option<string> => {
    const result = arr.find(dataItem => dataItem === item) ? item : null;
    return fromNullable(result)
};

interface TAppState {
  value: string
}

export class App extends React.PureComponent<{}, TAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChangeStorage = (e: React.ChangeEvent<HTMLInputElement>):void => {
    sessionStorage.setItem(SESSION_KEY, e.target.value);
    this.setState({value: e.target.value});

    if (!e.target.value) {
      sessionStorage.removeItem(SESSION_KEY);
    }
  };

  render() {
    const optionalValue = fromNullable(sessionStorage.getItem(SESSION_KEY));
    const checkValue = checkValueHOF(DATA);

    const valueInArray = optionalValue
          .chain(checkValue)
          .getOrElse('is not');

    const sessionValue = optionalValue
          .getOrElse(`There is nothing`);

    const valueFromStorage: string = `value: ${sessionValue}, type: ${typeof sessionValue}`;

    return (
        <div className="App">
          <fieldset>
            <label htmlFor={`customInput`}>Your message: </label>
            <input
                id={`customInput`}
                type={`text`}
                onChange={this.handleChangeStorage}
                value={this.state.value}
            />
          </fieldset>
          <p>{valueFromStorage}</p>
          <hr/>
          <p>Value {valueInArray} in array [{DATA.join(', ')}]</p>
        </div>
    );
  }
}
