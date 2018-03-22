import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CounterContainer from './containers/CounterContainer';
import InputContainer from './containers/InputContainer';
import reducer from './reducers/index';

const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <div>
            <CounterContainer />
            <InputContainer/>
        </div>
    </Provider>,
    document.getElementById('root')
);
store.subscribe(function(){
    console.log('store:', store.getState())
});

