import * as React from 'react';
import {request$} from "./SearchService";
import {ajax} from "rxjs/ajax"
import {of, Subject, fromEvent, Subscriber, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, tap, map, switchMap, mergeMap} from "rxjs/operators";

export type TSearchState = {
    inputValue: string
}

export class Search extends React.PureComponent<{}, TSearchState> {
    readonly state: TSearchState = {inputValue: ''};
    stream$ = new Subject();
    sub?: Subscription;
    URL: string = `https://api.github.com/search/users?q=`;

    componentDidMount(): void {
        this.sub = this.stream$
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                switchMap(v => ajax.getJSON(`${this.URL}${v}`)),
                map((response: any) => response.items),
                mergeMap(items => items)
            )
            .subscribe(v => console.log(v))
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value});
        this.stream$.next(e.target.value);
    };

    render() {
        const {inputValue} = this.state;

        return (
            <>
                <div className={"search__header"}>
                    <input
                        id={"inputId"}
                        value={inputValue}
                        onChange={this.handleChangeInput}
                    />
                </div>
            </>
        )
    }
}