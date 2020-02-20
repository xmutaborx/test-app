import * as React from 'react';
import { of } from 'rxjs';

export type TRxTestStreamState = {
    inputValue: string,
}

export class RxTestStream extends React.PureComponent<{}, TRxTestStreamState> {
    constructor(props: any) {
        super(props);

        this.state = {
            inputValue: ''
        }

    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value})
    }

    handleClick = () => {
        console.log('click')
    }


    render() {
        return (
            <>
                <h3>RxTestStream</h3>
                <hr/>
                <div>
                    <p>Input Value from State: {this.state.inputValue}</p>
                    <input
                        type={'text'}
                        value={this.state.inputValue}
                        onChange={this.handleChangeInput}
                    />
                    <button onClick={this.handleClick}>Click</button>
                </div>
            </>
        );
    }
}
