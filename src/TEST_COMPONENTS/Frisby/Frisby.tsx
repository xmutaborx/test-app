import * as React from 'react';
import {fromNullable, Option, some} from "fp-ts/lib/Option";
import {Left, Right, Either} from "fp-ts/lib/Either";

export type TFrisbyState = {
    input: string | null
}

export class Frisby extends React.Component<{}, TFrisbyState> {
    readonly state = {
        input: null
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({input: e.target.value})
        if (!e.target.value) {
            this.setState({input: null})
        }
    };

    handleShow = () => {
        const OPvalue = fromNullable(sessionStorage.getItem(`KEY`));
        console.log(OPvalue)
    };

    render() {
        const { input } = this.state;



        return (
            <div>
                <h4>FRISBY</h4>
                <button onClick={() => sessionStorage.setItem(`KEY`, `HEIL`)}>
                    Make storage
                </button>
                <button onClick={() => sessionStorage.removeItem(`KEY`)}>
                    Clear storage
                </button>
                <button onClick={this.handleShow}>
                    SHOW
                </button>
                <input
                    type={'text'}
                    // value={valueForInput}
                    onChange={this.onChange}
                />
            </div>
        )
    }

}
