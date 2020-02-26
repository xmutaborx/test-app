import * as React from 'react';
import { Link } from 'react-router-dom';

import { takeIdFromUrl } from "../../helpers/helpers";

const renderPlanetCard = (data) => {
    const id = takeIdFromUrl(data.url);
    return (
        <div className={'col s4 m4'}>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{data.name}</span>
                    <table>
                        <thead>
                        <tr>
                            <th>Climate</th>
                            <td>{data.climate}</td>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th>Diameter</th>
                            <td>{data.diameter}</td>
                        </tr>
                        <tr>
                            <th>Terrain</th>
                            <td>{data.terrain}</td>
                        </tr>
                        <tr>
                            <th>Population</th>
                            <td>{data.population}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-action">
                    <Link to={`/planets/${id}`}>More info...</Link>
                </div>
            </div>
        </div>
    )
};

const renderCharCard = (data) => {
    const planetId = takeIdFromUrl(data.homeworld);
    const id = takeIdFromUrl(data.url);
    return (
        <div className={'col s4 m4'}>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{data.name}</span>
                    <table>
                        <thead>
                        <tr>
                            <th>Birth year</th>
                            <td>{data.birth_year}</td>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th>Gender</th>
                            <td>{data.gender}</td>
                        </tr>
                        <tr>
                            <th>Hair color</th>
                            <td>{data.hair_color}</td>
                        </tr>
                        <tr>
                            <th>Home world</th>
                            <td><Link to={`/planets/${planetId}`}>Link</Link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-action">
                    <Link to={`/characters/${id}`}>More info...</Link>
                </div>
            </div>
        </div>
    )
};

export const CardsList = ({ data }) => {

    if (data.diameter) {
        return renderPlanetCard(data);
    } else  {
        return renderCharCard(data)
    }
};
