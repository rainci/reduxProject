import React from 'react';
import { createStore } from 'redux'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './containers/App'
import reducers from './reducers'

let store = createStore(reducers)

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
