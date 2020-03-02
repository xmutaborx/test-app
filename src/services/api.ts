import {ajax} from "rxjs/ajax";
import {Observable} from "rxjs";
import {RemoteData} from "@devexperts/remote-data-ts";
import {map} from "rxjs/operators";

export type SwapiRequest = string[];

export const requestStream$ = (request: string): Observable<RemoteData<Error, SwapiRequest>> =>
    ajax.getJSON(request)