import * as React from 'react';
import './Search.css';

import {ajax} from "rxjs/ajax"
import {EMPTY, Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap, catchError, tap, filter, first} from "rxjs/operators";

export type TSearchState = {
    inputValue: string,
    canIShow: boolean,
    isLoading: boolean,
    users: [{
        login: string,
        id: number,
        node_id: string,
        avatar_url: string,
        gravatar_id: string,
        url: string,
        html_url: string,
        followers_url: string,
        following_url: string,
        gists_url: string,
        starred_url: string,
        subscriptions_url: string,
        organizations_url: string,
        repos_url: string,
        events_url: string,
        received_events_url: string,
        type: string,
        site_admin: boolean,
        score: number
    }]
}

export class Search extends React.PureComponent<{}, TSearchState> {
    readonly state: TSearchState = {
        inputValue: '',
        canIShow: false,
        isLoading: false,
        users: [{
            login: '',
            id: 0,
            node_id: '',
            avatar_url: '',
            gravatar_id: '',
            url: '',
            html_url: '',
            followers_url: '',
            following_url: '',
            gists_url: '',
            starred_url: '',
            subscriptions_url: '',
            organizations_url: '',
            repos_url: '',
            events_url: '',
            received_events_url: '',
            type: '',
            site_admin: false,
            score: 0
        }]
    };

    stream$ = new Subject();
    sub?: Subscription;

    componentDidMount(): void {
        const URL = `https://api.github.com/search/users?q=`;

        this.sub = this.stream$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(v => {
                   if (v === '') {
                       this.setState({canIShow: false, isLoading: false});
                   }
                }),
                filter(v => v !== ''),
                tap(() => this.setState({isLoading: true})),
                switchMap(v => ajax.getJSON(`${URL}${v}`)
                    .pipe(
                        catchError(() => EMPTY)
                    )),
                map((response: any) => response.items),
                tap(data => {
                    this.setState({canIShow: true, users: data, isLoading: false})
                })
            )
            .subscribe()
    }

    componentWillUnmount(): void {
        this.sub?.unsubscribe()
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value});
        this.stream$.next(e.target.value);
    };

    render() {
        const {inputValue, users, canIShow, isLoading} = this.state;

        return (
            <>
                <div className={"search__header"}>
                    <span>Search users on GitHub: </span>
                    <input
                        id={"inputId"}
                        value={inputValue}
                        onChange={this.handleChangeInput}
                    />
                </div>
                <div className={"search__container"}>
                    {isLoading && (
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    )}
                    {users[0].id !== 0 && canIShow && users.map(item =>
                        <div key={item.id}>
                            <p>{item.login}</p>
                            <a href={item.html_url} target={"_blank"} rel="noopener noreferrer">
                                <img src={item.avatar_url} width={250}/>
                            </a>
                        </div>
                    )}
                </div>
            </>
        )
    }
}
