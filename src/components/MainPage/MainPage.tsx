import * as React from 'react';

import { Header } from "../Header/Header";
import { CardsList } from "../CardsList/CardsList";

import { SEARCH_TYPES, API_URL } from "../../constants/constants";
import {tap, map, switchMap} from "rxjs/operators";
import { requestStream$ } from "../../services/api";
import {Subject} from "rxjs";

// Как правильно описать searchType используя данные из константы SEARCH_TYPES ?

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
            switchMap(() => requestStream$(URL)),
            map((res: any) => res.results),
            tap((data) => this.setState({data, isLoading: false}))
        )
            .subscribe();

        // Нормально ли вообще, что сделал стрим из subject?
        // Сначала хотел просто через ajax, но нужно было до реквеста установить состояние прелоадера,
        // пришлось оборачивать еще в один слой

        sr$.next()
    };

    searchToggleHandler = (e) => {
        this.setState({searchType: e.target.value})
    };

    render() {
        const {data, isLoading, searchType} = this.state;
        return (
            <>
                <Header/>
                <div className={'content'}>
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
