import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'jotai';
import '../lib/bootstrap.5.1.1.min.css'
import './index.css';
import * as bootstrap from '../lib/bootstrap.bundle.5.1.1.min'
//import '~/lib/bootstrap.5.1.1.min.css';
import App from './App';

const root = ReactDOM.render(
    <Provider>
        <App />
    </Provider>, document.getElementById('root'));
//<React.StrictMode>
//    <App />
//</React.StrictMode>, document.getElementById('root'));
