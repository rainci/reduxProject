import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// create State object
let appState = observable({ timer: 1, title:'test mb' });
appState.resetTimer = action(() => {
    appState.timer = 0;
});
// define action
setInterval(
    action(() => {
        appState.timer += 1;
    }),
    1000
);
let App = observer(({ appState }) => {
    return (
        <div className="App">
            <h1>Time passed: {appState.timer}</h1>
            <button onClick={appState.resetTimer}>reset timer</button>
        </div>
    );
});

ReactDOM.render(<App appState={appState} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
