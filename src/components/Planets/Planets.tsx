import * as React from 'react';
import { Header } from "../Header/Header";

export type TPlanetsProps = {
    data: any
}

export class Planets extends React.PureComponent<TPlanetsProps, {}> {
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
                                {!data && (
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
