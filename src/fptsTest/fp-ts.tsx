import * as React from 'react';
import {fromNullable, none, option, Option, some} from "fp-ts/lib/Option";
import { sequenceT } from "fp-ts/lib/Apply";

//______________________________________
const first: Option<number> = some(3);
const second: Option<number> = none;
const third: Option<number> = some(5);
const fourth: Option<number> = some(10);

const sequence = sequenceT(option);

const additionItems = (arr: Array<number>): number => {
    return arr.reduce((sum: number, item: number) => sum + item, 0);
};

const addValueIfGreatHOF = (optionA: Option<number>) => (b: number) =>
    optionA
        .map((a) => a > b ? additionItems([a, b]) : a);

const addValueIfLessHOF = (optionA: Option<number>) => (b: number) =>
    optionA
        .map((a) => a < b ? additionItems([a, b]) : a);

const sumOption = (a: Option<number>, b: Option<number>) => sequence(a, b).map(additionItems);

const addNullableDeclarative = (a: Option<number>, b: Option<number>, c: Option<number>, d: Option<number>): Option<number> => {
    const defaultValue = some(0);

    const AB = sumOption(a, b);
    const CD = sumOption(c, d);

    const addC = addValueIfGreatHOF(c);
    const addD = addValueIfLessHOF(d);

    const corD: Option<number> = c.alt(d);

    return CD.alt(AB.chain((ab) =>
        addC(ab)
            .alt(addD(ab))))
        .alt(AB)
        .alt(corD)
        .alt(defaultValue);
};

console.log(addNullableDeclarative(first, second, third, fourth));
//______________________________________

const SESSION_KEY: string = `TEST_KEY`;
const DATA = [`some`, `other`, `test`];
const checkValueHOF = (arr: string[]) => (item: string): Option<string> => {
    const result = arr.find(dataItem => dataItem === item) ? item : null;
    return fromNullable(result)
};

export type TFpTest = {
    value: string
}

export class FpTest extends React.PureComponent<{}, TFpTest> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: ''
        }
    }

    handleChangeStorage = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
            <>
                <h3>FpTest component</h3>
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
            </>
        );
    }
}

