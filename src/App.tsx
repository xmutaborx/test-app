import * as React from 'react';
import { fromNullable, Option } from "fp-ts/lib/Option";

const SESSION_KEY: string = `TEST_KEY`;

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

  checkValueInArray = (item: string): Option<string> => {
      const DATA = [`some`, `other`, `test`];
      const result = DATA.find(dataItem => dataItem === item) ? item : null;

      return fromNullable(result)
  };

  render() {
    const optionalValue = fromNullable(sessionStorage.getItem(SESSION_KEY));

      const valueInArray = optionalValue
          .chain(this.checkValueInArray)
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
          <p>value {valueInArray} in array ['some', 'other', 'test']</p>
        </div>
    );
  }
}
