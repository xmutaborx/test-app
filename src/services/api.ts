import {ajax} from "rxjs/ajax";
import {Observable, of} from "rxjs";
import {failure, pending, RemoteData, success} from "@devexperts/remote-data-ts";
import {catchError, map, startWith} from "rxjs/operators";

export const requestStream$ = (request: string): Observable<RemoteData<Error, any>> =>
    ajax.getJSON(request).pipe(
        map(success),
        catchError(err => of(failure(err))),
        startWith(pending)
    );