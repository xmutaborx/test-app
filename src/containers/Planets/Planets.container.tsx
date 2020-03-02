import * as React from 'react';
import { requestStream$ } from '../../services/api'

import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2'
import { Planets } from '../../components/Planets/Planets';
import { pending } from "@devexperts/remote-data-ts/dist/remote-data";
import {API_URL} from "../../constants/constants";

export const planetComponent = (props) => {
    const id = props.match.params.id;

    const data = requestStream$(`${API_URL.planets}${id}`);

    const defaultProps = {
        data: pending
    };

    const PlanetsContainer = withRX(Planets)(() => {
        return {
            props: {
                data
            },
            defaultProps
        }
    });

    return <PlanetsContainer/>
};
