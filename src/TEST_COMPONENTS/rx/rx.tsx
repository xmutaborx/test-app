/* eslint-disable */
import * as React from 'react';
import {Observable, of, from, interval, timer, range, Subject, BehaviorSubject, ReplaySubject} from 'rxjs';
import {scan, map, filter, take, tap, reduce, switchMap} from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';
import { ajax, AjaxError, AjaxRequest } from 'rxjs/ajax';

export type TRxProps = {
    title: string,
    description?: string,
}

export type TRxState = {
    input: '',
    responseApi: [{
        userId: number,
        id: number,
        title: string,
        body: string
    }],
    responseAjax: [{
        login: string,
        id: number,
        node_id: string,
        avatar_url: string,
        gravatar_id: string,
        url: string,
        html_url: string,
        followers_url: string,
        following_irl: string,
        gists_url: string,
        starred_url: string,
        subscriptions_url: string,
        organizations_url: string,
        repos_url: string,
        events_url: string,
        received_events_url: string,
        type: string,
        site_admin: boolean
    }]
}

export class Rx extends React.PureComponent<TRxProps, TRxState> {
    constructor(props: TRxProps) {
        super(props);

        this.state = {
            input: '',
            responseApi: [{
                userId: 0,
                id: 0,
                title: '',
                body: ''
            }],
            responseAjax: [{
                login: '',
                id: 0,
                node_id: '',
                avatar_url: '',
                gravatar_id: '',
                url: '',
                html_url: '',
                followers_url: '',
                following_irl: '',
                gists_url: '',
                starred_url: '',
                subscriptions_url: '',
                organizations_url: '',
                repos_url: '',
                events_url: '',
                received_events_url: '',
                type: '',
                site_admin: false
            }]
        }
    }

    //// Subject. Важно подписаться до того как объявятся события next
    handleStartSubject = () => {
        const stream$ = new Subject();
        stream$.subscribe(v => console.log(v, 'Subject'))
        stream$.next('hello');
        stream$.next('hello next');
    };

    //// Behavior Subject (Как Subject, но с дефолтным значением которое выведется первым)
    handleStartBehaviorSubject = () => {
        const stream$ = new BehaviorSubject('First Behavior Subject Value');
        stream$.subscribe(v => console.log(v, 'Behavior subject'));
        stream$.next('hello 2');
        stream$.next('hello next 2');
    };

    //// Replay Subject. Позволяет сохранить предыдущие значения, можно подписаться после объявления всех next
    // аргументом передается колличество последних сохраненных событий (буфер)
    handleStartReplaySubject = () => {
        const stream$ = new ReplaySubject(1);
        stream$.next('hello 2');
        stream$.next('hello next 2');

        stream$.subscribe(v => console.log(v, 'Replay subject'));
    };

    //// SwitchMap - перенаправление стрима... nihuya пока не понял как применить, надо разобраться!!!!!!!!!!
    handleSwitchMap = () => {
        const switchMapStream$ = interval(1000)
            .pipe(
                map(v => v + 1)
            )
            .subscribe({
                next: (v) => console.log('Switch Map: ', v),
                complete: () => console.log('SwitchMap Completed')
            })
    };

    //// fromFetch
    handleRequest = () => {
        console.log('request...');
        const API = 'https://jsonplaceholder.typicode.com/posts';
        const data$ = fromFetch(API)
            .pipe(
                switchMap(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return of({error: true, message: `Error ${response.status}`});
                    }
                })
            );

        data$.subscribe({
            next: (result) => this.handlePushResponse(result),
            error: (err) => console.log('Error: ', err),
            complete: () => console.log('Completed')
        })
    };

    handlePushResponse = (response: any) => {
        this.setState({responseApi: response})
    };

    //// AJAX Request 1
    handleAjaxRequest = () => {
        console.log('Ajax request...');
        const API = `https://api.github.com/users?per_page=5`;
        const request$ = ajax.getJSON(API);
        request$.subscribe({
            next: (v) => this.handlePushAjaxToState(v),
        })
    };

    handlePushAjaxToState = (response: any) => {
        this.setState({
            responseAjax: response
        })
    }

    //// AJAX Request 2
    handleAjaxRequest2 = () => {
        console.log('Ajax request...');
        const API = `https://api.github.com/users?per_page=5`;

        const users$ = ajax({
            url: API,
            method: 'GET',
            headers: {},
            body: {}
        })
            .pipe(
                map(response => response.response)
            )

        users$.subscribe(
            v => console.log(v),
            err => console.log(err)
        )
    };




    //
    //////////
    handleChangeInput = (e: any) => {
        this.setState({input: e.target.value})
    };

    render() {
        const { title, description } = this.props;
        const { responseApi, responseAjax } = this.state;

        let result = '';
        const weirdStream$ = of(this.state.input);
        const subWeirdStream = weirdStream$.subscribe(
            v => result = v
        )

        //// of - create stream
        const of$ = of ('Stream from of', 1, 2);
        // of$.subscribe(val => console.log(val, 'Value'));

        //// from - create stream (work with array)
        const arr$ = from([1, 2, 3]);
        // arr$.subscribe(val => console.log(val, 'from value'));

        //// Interval, arg = ms
        const interval$ = interval(1000);
        // const subInterval = interval$.subscribe(v => console.log(v + 1, 'interval'));
        // setTimeout(() => subInterval.unsubscribe(), 5000);

        //// Timer, arg = ms. (like setTimeout stream)
        // const timer$ = timer(2500).subscribe(v => console.log(v));

        //// Range
        // const range$ = range(42, 10).subscribe(v => console.log(v));

        /// From Promise
        // const promiseSource$ = from(new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve('From Promise')
        //     }, 2000)
        // }));
        // const subPromise = promiseSource$.subscribe(v => console.log(v));

        //// Observable
        const stream$ = new Observable(observer => {
            observer.next('First value');

            setTimeout(() => observer.next('After 1000ms'), 1000);
            // setTimeout(() => observer.error('Error After 2000ms'), 2000);
            setTimeout(() => observer.next('After 3000ms'), 3000);
            setTimeout(() => observer.complete(), 4000);
        });

        //// Subscribe to observable
        // stream$.subscribe(
        //     val => console.log('stream value: ', val),
        //     err => console.log('Error: ', err),
        //     () => console.log('Completed')
        // );
        //// with unsubscribe
        // const sub = stream$.subscribe(...)
        // sub.unsubscribe()

        //// alternative entry
        // const observer = {
        //     next: (val: string) => console.log(val),
        //     error: (err: string) => console.log(err),
        //     complete: () => console.log('Completed')
        // };
        // stream$.subscribe(observer);
        //
        //_________________________________________
        //
        //// Operators. Pipe -  позволяет поочередно предавать операторы которые работают с возвращаемыми значениями стрима
        //
        // tap - будет выполняться на каждой итерации не модифицируя данные
        // map - модифицирует значение применяя колбэк
        // filter - проверяет удовлетворяет ли значение условию
        // take - устанавливает колличество выводимых значений next, в нашем случае это те, которые удовлетворили filter и завершает стрим
        const intervalStream$ = interval(1000)
            .pipe(
                tap(v => console.log('Промежуточный результат: ', v)),
                map(v => v * 3),
                filter(v => v % 2 === 0),
                take(5)
            );
        // takeLast(a: number) - выведет последние a-колличество элементов. Для правильной работы необходимо ограничить
        // чтрим через take(b: number) где b >= a. Завершает стрим complete
        // TakeWhile(v => v < 10) - стрим будет работать пока условие true
        // Подписка на стрим:
        // intervalStream$.subscribe({
        //     next: v => console.log('Next: ', v),
        //     complete: () => console.log('Completed')
        // });
        //
        // УТЕЧКИ ПАМЯТИ
        //
        // take(num) - если перед take(1) стоит filter, который не пропустил значение, то в take ничего не приходит
        // = утечка памяти
        //
        // takeUntil() -
        //
        //
        // fisrt() - оператор закрывающий поток после первого получечнного результата. Но если через него пролетит
        // undefined, то он выкинет ошибку + утчека памяти
        //
        //
        //_________________________________________
        //
        // scan - типа редюса. в нашем случае выводит сумму элементов которые попадают в next
        // reduce - тоже что и scan, но выполняется перед завершением стрима
        // const intervalStream2$ = interval(1000)
        //     .pipe(
        //         tap(v => console.log('Tap: ', v)),
        //         scan((acc, v) => acc + v, 0 ),
        //         take(5),
        //         // reduce((acc, v) => acc + v, 0)
        //     );
        //
        // intervalStream2$.subscribe(
        //     (v) => console.log(v),
        //     null,
        //     () => console.log('Interval Stream 2 Completed')
        // );

        return (
            <>
                <h3>test component for RX</h3>
                <p>title props: {title}</p>
                <p>description props: {description}</p>
                <input
                    type={"text"}
                    value={this.state.input}
                    onChange={this.handleChangeInput}
                />
                <p>Value from state: {this.state.input}</p>
                <p>Value from stream: {result}</p>
                <div className="btn-wrap">
                    <button type={'button'} onClick={this.handleStartSubject}>Start Subject Stream</button>
                    <button type={'button'} onClick={this.handleStartBehaviorSubject}>Start Behavior Subject Stream</button>
                    <button type={'button'} onClick={this.handleStartReplaySubject}>Start Replay Subject</button>
                    <button type={'button'} onClick={this.handleSwitchMap}>SwitchMap Stream</button>
                    <button type={'button'} onClick={this.handleRequest}>fromFetch Request</button>
                    <button type={'button'} onClick={this.handleAjaxRequest}>AJAX Request</button>
                    <button type={'button'} onClick={this.handleAjaxRequest2}>AJAX Request 2</button>
                </div>
                <div>
                    {responseApi.length && responseApi.map((item, i) => (
                        <div
                            className="item_api"
                            key={item.id}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                <div className="container_ajax">
                    {responseAjax[0].id !== 0 && responseAjax.map((item, i) => (
                        <div
                            className="item_api"
                            key={item.id}
                        >
                            <img className="avatar" src={item.avatar_url}/>
                            <p>{item.login}</p>
                            <p>Organization: {item.organizations_url}</p>
                        </div>
                    ))}
                </div>
            </>
        )
    }

}
