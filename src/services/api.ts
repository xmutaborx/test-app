import {ajax} from "rxjs/ajax";
import {Observable} from "rxjs";
import {RemoteData} from "@devexperts/remote-data-ts";
import {map} from "rxjs/operators";

export const requestStream$ = (request: string): Observable<RemoteData<Error, string>> =>
    ajax.getJSON(request)