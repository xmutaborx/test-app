import {ajax} from "rxjs/ajax";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {interval, of, Subscription} from 'rxjs'

export const request$ = (target: string) => {
    return ajax.getJSON(`https://api.github.com/search/users?q=${target}`)
};