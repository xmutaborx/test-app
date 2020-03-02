import * as React from 'react';
import { Header } from "../Header/Header";
import { fold } from '@devexperts/remote-data-ts'
import {SwapiResponse} from "../../services/api";

// export type TPlanetsProps = {
//     data: any
// }

export type TPlanetsProps = {
    data: SwapiResponse
}

export class Planets extends React.PureComponent<TPlanetsProps, {}> {

    renderSuccess = (data) => {
        return (
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
        )
    };

    renderLoader = () => (
        <div className="progress">
            <div className="indeterminate"/>
        </div>
    );

    result = fold(
        () => null,
        this.renderLoader,
        () => null,
        this.renderSuccess
    );

    render() {
        const {data} = this.props;

        return (
            <>
                <Header/>
                <div className={'content'}>
                    <h4>PLANETS</h4>
                    <div className={'row'}>
                        <div className="col s12">
                            <div className={'row'}>
                                {this.result(data)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
