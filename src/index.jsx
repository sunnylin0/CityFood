import React from 'react';
import ReactDOM from 'react-dom';
import '../lib/bootstrap.5.1.1.min.css'
import './index.css';
//import '../lib/font-awesome.4.5.0.min.css'
import * as bootstrap from '../lib/bootstrap.bundle.5.1.1.min'
//import '~/lib/bootstrap.5.1.1.min.css';
import App from './App';

const root = ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));
