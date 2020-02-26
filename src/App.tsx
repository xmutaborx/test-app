import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage } from "./components/MainPage/MainPage";
import { Characters } from "./components/Characters/Characters";
import { Planets } from "./components/Planets/Planets";

import { FpTest } from "./fptsTest/fp-ts";
import { Rx } from './rx/rx';
import {PlanetInfoContainer} from "./PlanetInfo/PlanetInfoContainer";
import {Search} from "./SearchWithRx/Search";



export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
        <Switch>
            <Route exact path={"/"} component={MainPage} />
            <Route exact path={"/characters/:id"} component={Characters} />
            <Route exact path={"/planets/:id"} component={Planets} />

            <Route exact path={"/fp-test"} component={FpTest} />
            <Route exact path={"/rx"} component={Rx} />
            <Route exact path={"/planetinfo"} component={PlanetInfoContainer} />
            <Route exact path={"/search"} component={Search} />
        </Switch>
    );
  }
}
