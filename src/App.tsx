import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage } from "./components/MainPage/MainPage";
import { Characters } from "./components/Characters/Characters";
import {  planetComponent } from "./containers/Planets/Planets.container";
import { Frisby } from './TEST_COMPONENTS/Frisby/Frisby'
import { FpTest } from "./TEST_COMPONENTS/fptsTest/fp-ts";
import { Rx } from './TEST_COMPONENTS/rx/rx';
import {PlanetInfoContainer} from "./TEST_COMPONENTS/PlanetInfo/PlanetInfoContainer";
import {Search} from "./TEST_COMPONENTS/SearchWithRx/Search";



export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
        <Switch>
            <Route exact path={"/"} component={MainPage} />
            <Route exact path={"/characters/:id"} component={Characters} />
            <Route exact path={"/planets/:id"} component={planetComponent} />


            <Route exact path={"/frisby"} component={Frisby} />
            <Route exact path={"/fp-test"} component={FpTest} />
            <Route exact path={"/rx"} component={Rx} />
            <Route exact path={"/planetinfo"} component={PlanetInfoContainer} />
            <Route exact path={"/search"} component={Search} />
        </Switch>
    );
  }
}
