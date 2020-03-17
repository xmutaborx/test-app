/* eslint-disable */
import * as React from 'react'
import {TPlanetInfoProps} from "./PlanetInfo";
import {getPlanetInfoData} from './PlanetInfoService'
import {map, tap} from "rxjs/operators"
import {Subscription} from "rxjs";
import {PlanetInfo} from "./PlanetInfo";

export class PlanetInfoContainer extends React.PureComponent<{}, TPlanetInfoProps> {
    readonly state: TPlanetInfoProps = {
        data: {
            planetName: 'N/A',
            planetDiameter: 'N/A'
        }
    };
    subscription$?: Subscription;

    componentDidMount(): void {
        this.subscription$ = getPlanetInfoData.pipe(
            tap(data => console.log(data)),
            map(data => ({data: {planetName: data.name, planetDiameter: data.diameter}})),
            tap(props => this.setState(props))
        )

            .subscribe()
    }

    componentWillUnmount(): void {
        this.subscription$ && this.subscription$.unsubscribe();
    }

    render() {
        return (
            <PlanetInfo {...this.state} />
        )
    }
}