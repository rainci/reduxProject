import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Tbd from './Tbd'
import Home from './Home'

const App = () => {
    return (
        <div>
            我是公共的
            <Route path="/home" component={Home} />
            <Route path="/tbd" component={Tbd} />
        </div>
    )
}
const Foot = () => {
    return (
        <ul>
            <li>
                <Link to="/home">About Us1 (static)</Link>
            </li>
            <li>
                <Link to="/tbd">Company (static)</Link>
            </li>
        </ul>
    )
}
const Routers = () => (
    <div>
        <BrowserRouter>
            <div>
                <Foot />
                <Route path="/" component={App} />
            </div>
        </BrowserRouter>
    </div>
);

export default Routers;
