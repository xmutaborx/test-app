import {ajax} from "rxjs/ajax";
import {Observable, of} from "rxjs";
import {failure, pending, RemoteData, success} from "@devexperts/remote-data-ts";
import {catchError, map, startWith} from "rxjs/operators";
import {TPlanetsProps} from "../components/Planets/Planets";

export type SwapiResponse = {
    name: string;
    rotation_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: number;
}

export const requestStream$ = (request: string): Observable<RemoteData<Error, SwapiResponse>> =>
    ajax.getJSON<SwapiResponse>(request).pipe(
        map(data => ({
            name: data.name,
            rotation_period: data.rotation_period,
            diameter: data.diameter,
            climate: data.climate,
            gravity: data.gravity,
            terrain: data.terrain,
            surface_water: data.surface_water,
            population: data.population
        })),
        map(success),
        catchError(err => of(failure<Error>(err))),
        startWith(pending)
    );
