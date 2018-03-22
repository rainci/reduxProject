import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CounterContainer from './containers/index';
import counterReducer from './reducers/index';

const store = createStore(counterReducer);
ReactDOM.render(
    <Provider store={store}>
        <CounterContainer />
    </Provider>,
    document.getElementById('root')
);


