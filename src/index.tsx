import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { history } from './history';

ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
serviceWorker.unregister();
