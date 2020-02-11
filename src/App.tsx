import React from 'react';
import { Option } from 'fp-ts/lib/Option'

const SESSION_KEY: string = `TEST_KEY`;

class App extends React.PureComponent<{}, { value: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChangeStorage = (value: string) => {
    sessionStorage.setItem(SESSION_KEY, value);
    this.setState({value});
  };

  handleShowStorage = () => {
    const value: string | null = sessionStorage.getItem(SESSION_KEY);
    if (value === null) {
      return `value is null`
    } else {
      return `value: ${value}, type: ${typeof value}`
    }


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
