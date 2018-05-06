import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import './index.css';
// import reducer from 'reducer'
import Product from './components/Product'
import App from './container'
const store = createStore();

ReactDOM.render(
    <Provider store = {store}>    
        <App />
    </Provider>    
, document.getElementById('root'));
