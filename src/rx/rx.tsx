import * as React from 'react';
import {Observable, of, from, interval, timer, range} from 'rxjs';
import { scan } from "rxjs/operators";

export type TRxProps = {
    title: string,
    description?: string,
}

export type TRxState = {
    counter: number
}

export class Rx extends React.PureComponent<TRxProps, TRxState> {
    constructor(props: TRxProps) {
        super(props);

        this.state = {
            counter: 0
        }
    }

    render() {
        const { title, description } = this.props;

        //// of - create stream
        const of$ = of (1, 2, 3);
        // of$.subscribe(val => console.log(val, 'Value'));

        //// from - create stream (work with array)
        const arr$ = from([1, 2, 3]);
        // arr$.subscribe(val => console.log(val, 'from value'));

        //// operator pipe and scan. pipe - передает промежуточный результат какому либо методу
        //// scan - метод для преобразования данных
        const arr2$ = from([1, 2, 3]).pipe(
            scan((acc: number[], v: number) => acc.concat(v), [])
        );
        // arr2$.subscribe(val => console.log(val));

        //// Interval, arg = ms
        const interval$ = interval(1000);
        const subInterval = interval$.subscribe(v => console.log(v + 1, 'interval'));
        setTimeout(() => subInterval.unsubscribe(), 5000);

        //// Timer, arg = ms. (like setTimeout stream)
        // const timer$ = timer(2500).subscribe(v => console.log(v));

        //// Range
        // const range$ = range(42, 10).subscribe(v => console.log(v));


        //_________________________________________
        //// create stream with Observable
        const stream$ = new Observable(observer => {
            observer.next('First value');

            setTimeout(() => observer.next('After 1000ms'), 1000);
            // setTimeout(() => observer.error('Error After 2000ms'), 2000);
            setTimeout(() => observer.next('After 3000ms'), 3000);
            setTimeout(() => observer.complete(), 4000);
        });

        // Subscribe to observable
        stream$.subscribe(
            val => console.log('stream value: ', val),
            err => console.log('Error: ', err),
            () => console.log('Completed')
        );
        // with unsubscribe
        // const sub = stream$.subscribe(...)
        // sub.unsubscribe()

        //// alternative entry
        // const observer = {
        //     next: (val: string) => console.log(val),
        //     error: (err: string) => console.log(err),
        //     complete: () => console.log('Completed')
        // };
        // stream$.subscribe(observer);


        return (
            <>
                <h3>test component for RX</h3>
                <p>title props: {title}</p>
                <p>description props: {description}</p>

                <button type={'button'}>Stream Button</button>
            </>
        )
    }

}
