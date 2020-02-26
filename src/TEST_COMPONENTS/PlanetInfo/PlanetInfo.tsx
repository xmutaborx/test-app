import * as React from 'react';

export type TPlanetInfoProps = {
    data: TPlanetInfoData;
};

export type TPlanetInfoData = {
    planetName: string,
    planetDiameter: string
};

export type TPlanetInfoState = {
    value: string
}

export const PlanetInfo = ({ data }: TPlanetInfoProps) => {
    return (
        <>
            <p>Planet Name: {data.planetName}</p>
            <p>Planet Diameter: {data.planetDiameter}</p>
        </>
    )
};
