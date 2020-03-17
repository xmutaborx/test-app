/* eslint-disable */
import * as React from 'react';

import { Header } from "../Header/Header";
import { CardsList } from "../CardsList/CardsList";
import { SEARCH_TYPES, API_URL } from "../../constants/constants";
import {tap, map, switchMap} from "rxjs/operators";
import {Subject} from "rxjs";
import {ajax} from "rxjs/ajax";
import { themr } from 'react-css-themr';

import * as css from './MainPage.module.scss';

export type TMainPageState = {
    searchType: 'PLANETS' | 'CHARACTERS',
    inputSearch: string,
    isLoading: boolean,
    data: [{
        [key: string]: string
    }],
}

export class MainPage extends React.PureComponent<{}, TMainPageState> {
    readonly state: TMainPageState = {
        searchType: 'PLANETS',
        inputSearch: '',
        isLoading: false,
        data: [{
            name: '',
        }]
    };

    clickHandler = () => {
        const URL = this.state.searchType === SEARCH_TYPES.planets ? API_URL.planets : API_URL.char;

        const sr$ = new Subject();
        sr$.pipe(
            tap(() => this.setState({isLoading: true})),
            switchMap(() => ajax.getJSON(URL)),
            map((res: any) => res.results),
            tap((data) => this.setState({data, isLoading: false}))
        )
            .subscribe();

        sr$.next();
        sr$.unsubscribe();
    };

    searchToggleHandler = (e) => {
        this.setState({searchType: e.target.value})
    };

    render() {
        const {data, isLoading, searchType} = this.state;
        console.log(css);
        return (
            <>
                <Header/>
                <div className={'container'}>
                    <h3>STAR WARS API TEST</h3>
                    <div className={'row'}>
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s3">
                                    <p>What are we looking for?</p>
                                    <p>
                                        <label>
                                            <input
                                                name="group1"
                                                type="radio"
                                                value={SEARCH_TYPES.planets}
                                                onChange={this.searchToggleHandler}
                                                checked={searchType === SEARCH_TYPES.planets}
                                            />
                                            <span>Planets</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input
                                                name="group1"
                                                type="radio"
                                                value={SEARCH_TYPES.char}
                                                onChange={this.searchToggleHandler}
                                                checked={searchType === SEARCH_TYPES.char}
                                            />
                                            <span>Characters</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                            <button
                                className="btn waves-effect waves-light"
                                onClick={this.clickHandler}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div className={'row'}>
                        {isLoading && (
                            <div className="progress">
                                <div className="indeterminate"/>
                            </div>
                        )}

                        {data[0].name && data.map(item => (
                            <CardsList
                                key={item.name}
                                data={item}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

// export const MainPageTheme = themr(Symbol(), css)(MainPage);