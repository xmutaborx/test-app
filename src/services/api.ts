import {ajax} from "rxjs/ajax";
import {Observable} from "rxjs";
import {Response} from "../TEST_COMPONENTS/PlanetInfo/PlanetInfoService";

export const requestStream$ = (url: string): Observable<Response> =>
    ajax.getJSON(url);