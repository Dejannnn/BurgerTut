import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose,applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import burgerBuilderAllReducers from './store/reducers/burgerBuilder';
import orderReducers from './store/reducers/order';
import Auth from './store/reducers/auth';
import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(combineReducers({burgerBuilder: burgerBuilderAllReducers, orders: orderReducers, auth: Auth}), composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
