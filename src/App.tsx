import * as React from 'react';
import { FpTest } from "./fptsTest/fp-ts";
import { Rx } from './rx/rx';

export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
        <div className="App">
            <div className="fp_container">
                {/*<FpTest/>*/}
            </div>
            <Rx
                title={'this is title'}
                description={'this is description'}
            />
        </div>
    );
  }
}
