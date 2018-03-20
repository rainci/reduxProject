import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {LoginContainer} from './containers/LoginContainer'; 
import {ShowContainer} from './containers/ShowContainer'; 
import {reducer} from './reducers/index'; 
import './index.css';

const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <div>
            <LoginContainer />
            <ShowContainer />
        </div>
    </Provider>,
    document.getElementById('root')
);
store.subscribe(function(){
    console.log('store:', store.getState())
});
