import * as React from 'react';
import { Header } from "../Header/Header";
import { requestStream$ } from "../../services/api";
import { API_URL } from "../../constants/constants";
import {tap} from "rxjs/operators";

export type TPlanetsProps = {
    match: {
        params: {
            id: string
        }
    }
}

export type TPlanetsState = {
    data: {
        [key: string]: string
    },
    isLoading: boolean
}

export class Planets extends React.PureComponent<TPlanetsProps, TPlanetsState> {
    readonly state: TPlanetsState = {
        data: {
            name: ''
        },
        isLoading: true
    };

    planetId = this.props.match.params.id;

    componentDidMount(): void {
        requestStream$(`${API_URL.planets}${this.planetId}`)
            .pipe(
                tap(data => this.setState({data, isLoading: false})),
                tap(data => console.log(data))
            )
            .subscribe()
    }

    render() {
        const {isLoading, data} = this.state;

        return (
            <>
                <Header/>
                <div className={'content'}>
                    <h4>PLANETS</h4>
                    <div className={'row'}>
                        <div className="col s12">
                            <div className={'row'}>
                                {isLoading && (
                                    <div className="progress">
                                        <div className="indeterminate"/>
                                    </div>
                                )}

                                {data.name && (
                                    <table className={'striped'}>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>{data.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Rotation Period</th>
                                                <td>{data.rotation_period}</td>
                                            </tr>
                                            <tr>
                                                <th>Diameter</th>
                                                <td>{data.diameter}</td>
                                            </tr>
                                            <tr>
                                                <th>Climate</th>
                                                <td>{data.climate}</td>
                                            </tr>
                                            <tr>
                                                <th>Gravity</th>
                                                <td>{data.gravity}</td>
                                            </tr>
                                            <tr>
                                                <th>Terrain</th>
                                                <td>{data.terrain}</td>
                                            </tr>
                                            <tr>
                                                <th>Surface Water</th>
                                                <td>{data.surface_water}</td>
                                            </tr>
                                            <tr>
                                                <th>Population</th>
                                                <td>{data.population}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
