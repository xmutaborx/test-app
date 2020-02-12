import * as React from 'react';
import { fromNullable } from "fp-ts/lib/Option";
import {ChangeEvent} from "react";

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

  handleChangeStorage = (e: ChangeEvent<HTMLInputElement>):void => {
    sessionStorage.setItem(SESSION_KEY, e.target.value);
    this.setState({value: e.target.value});

    if (!e.target.value) {
      sessionStorage.removeItem(SESSION_KEY);
    }
  };

  render() {
    const optionalValue = fromNullable(sessionStorage.getItem(SESSION_KEY))
        .getOrElse('there is nothing');
    let valueFromStorage: string = `value: ${optionalValue}, type: ${typeof optionalValue}`;

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
        </div>
    );
  }
}
