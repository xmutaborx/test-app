import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <div className={'header'}>
            <nav className={'header__navigation'}>
                <div className={'header__container'}>
                    <Link to={"/"}>Main Page</Link>
                </div>
                <div className={'header__container'}>
                    <Link to={"/search"}>Search on Github</Link>
                    <Link to={"/fp-test"}>Fp test</Link>
                    <Link to={"/rx"}>Rx</Link>
                    <Link to={"/planetinfo"}>Planet Info</Link>
                    <Link to={"/Frisby"}>Frisby</Link>
                </div>
            </nav>
        </div>
    )
};
