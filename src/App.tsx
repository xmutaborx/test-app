import * as React from 'react';
import { FpTest } from "./fptsTest/fp-ts";
import { Rx } from './rx/rx';
import { RxTestStream } from "./RxTestStream/RxTestStream";
import {PlanetInfoContainer} from "./PlanetInfo/PlanetInfoContainer";

export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
        <div className="App">
            <div className="fp_container">
                {/*<FpTest/>*/}
                <RxTestStream/>
            </div>
            <Rx
                title={'this is title'}
                description={'this is description'}
            />
            <PlanetInfoContainer/>
        </div>
    );
  }
}
