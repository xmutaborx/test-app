import React from 'react';
import { fromNullable } from 'fp-ts/lib/Option'

const SESSION_KEY: string = `TEST_KEY`;

class App extends React.PureComponent<{}, { value: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChangeStorage = (value: string):void => {
    sessionStorage.setItem(SESSION_KEY, value);
    this.setState({value});
  };

  handleShowStorage = ():string => {
    const optionalValue = fromNullable(sessionStorage.getItem(SESSION_KEY))
        .map((item: string) => item)
        // вот тут ошибка с map
        // TS2339: Property 'map' does not exist on type 'Option<string>'.   Property 'map' does not exist on type 'None'
        .getOrElse(`there is nothing`)

    // if (value === null) {
    //   return `there is nothing`
    // }

    return `value: ${optionalValue}, type: ${typeof optionalValue}`
  };

  render() {
    return (
        <div className="App">
          <fieldset>
            <label htmlFor={`customInput`}>Your message: </label>
            <input
                id={`customInput`}
                type={`text`}
                onChange={(e) => this.handleChangeStorage(e.target.value)}
                value={this.state.value}
            />
          </fieldset>
          <p>{this.handleShowStorage()}</p>
        </div>
    );
  }
}

export default App;
