import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../lib/bootstrap.5.1.1.min.css'
import * as bootstrap from '../lib/bootstrap.bundle.5.1.1.min'
//import '~/lib/bootstrap.5.1.1.min.css';
import App from './App';

const root = ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));
