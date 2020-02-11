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

  handleChangeStorage = (e: any) => {
    sessionStorage.setItem(SESSION_KEY, e.target.value);
    this.setState({value: e.target.value});
  };

  handleShowStorage = () => {
    const value: string | null = sessionStorage.getItem(SESSION_KEY);
    return `value: ${value}, type: ${typeof value}`

  };


  render() {
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

          <p>{this.handleShowStorage()}</p>
        </div>
    );
  }
}

export default App;
