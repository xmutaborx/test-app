import * as React from 'react';
import {Observable, of, from, interval, timer, range, Subject, BehaviorSubject, ReplaySubject} from 'rxjs';
import {scan, map, filter, take, tap, reduce, switchMap} from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';

export type TRxProps = {
    title: string,
    description?: string,
}

export type TRxState = {
    responseApi: [{
        userId: number,
        id: number,
        title: string,
        body: string
    }]
}

export class Rx extends React.PureComponent<TRxProps, TRxState> {
    constructor(props: TRxProps) {
        super(props)

        this.state = {
            responseApi: [{
                userId: 0,
                id: 0,
                title: '',
                body: ''
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

    //// SwitchMap - перенаправление стрима... нихуя пока не понял как применить, надо разобраться!!!!!!!!!!
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

    handleRequest = () => {
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
            complete: () => console.log('Completed')
        })
    };

    handlePushResponse = (response: any) => {
        this.setState({responseApi: response})
    };


    render() {
        const { title, description } = this.props;
        const { responseApi } = this.state;
        //// of - create stream
        const of$ = of (1, 2, 3);
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
        //_________________________________________
        //
        // scan - типа редюса. в нашем случае выводит сумму элементов которые попадают в next
        // reduce - тоже что и scan, но выполняется перед завершением стрима
        const intervalStream2$ = interval(1000)
            .pipe(
                tap(v => console.log('Tap: ', v)),
                scan((acc, v) => acc + v, 0 ),
                take(5),
                // reduce((acc, v) => acc + v, 0)
            );

        intervalStream2$.subscribe(
            (v) => console.log(v),
            null,
            () => console.log('Interval Stream 2 Completed')
        );

        return (
            <>
                <h3>test component for RX</h3>
                <p>title props: {title}</p>
                <p>description props: {description}</p>
                <div className="btn-wrap">
                    <button type={'button'} onClick={this.handleStartSubject}>Start Subject Stream</button>
                    <button type={'button'} onClick={this.handleStartBehaviorSubject}>Start Behavior Subject Stream</button>
                    <button type={'button'} onClick={this.handleStartReplaySubject}>Start Replay Subject</button>
                    <button type={'button'} onClick={this.handleSwitchMap}>SwitchMap Stream</button>
                    <button type={'button'} onClick={this.handleRequest}>API Request</button>
                </div>
                <div>
                    {responseApi.length && responseApi.map((item, i) => (
                        <div key={i + 'a'}>{item.title}</div>
                    ))}
                </div>
            </>
        )
    }

}
