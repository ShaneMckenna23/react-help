import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom';
import store from './Redux/store.js'

ReactDOM.render(
    <Provider store={store}>
    <HashRouter><App/></HashRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
