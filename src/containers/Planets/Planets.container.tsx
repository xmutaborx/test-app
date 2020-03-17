import * as React from 'react';
import { requestStream$ } from '../../services/api'

import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2'
import {Planets, TPlanetsProps} from '../../components/Planets/Planets';

import {API_URL} from "../../constants/constants";
import {initial} from "@devexperts/remote-data-ts/dist/remote-data";

export const planetComponent = (props) => {
    const id = props.match.params.id;

    const data$ = requestStream$(`${API_URL.planets}${id}`);

    const defaultProps = {
        data: initial
    };

    const PlanetsContainer = withRX<TPlanetsProps>(Planets)(() => {
        return {
            props: {
                data: data$
            },
            defaultProps
        }
    });

    return <PlanetsContainer/>
};
