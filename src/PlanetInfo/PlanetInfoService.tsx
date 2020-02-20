import {interval, Observable} from "rxjs";
import {ajax} from "rxjs/ajax";

export type Response = {
    [key: string]: string
}

const randomPlanet = () => {
    return Math.floor(1 + Math.random() * (20 - 1))
};

export const getPlanetInfoData: Observable<Response> = ajax.getJSON(`https://swapi.co/api/planets/${randomPlanet()}`);
