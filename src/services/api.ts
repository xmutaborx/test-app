import {ajax, AjaxResponse} from "rxjs/ajax";
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
    ajax(request).pipe(
        map(res => res.response),
        map(data => success<SwapiResponse>(data)),
        catchError(err => of(failure<Error>(err))),
        startWith(pending)
    );
