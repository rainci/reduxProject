import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Divider,  Layout } from 'antd';
import Home from './Home';
import Tbd from './Tbd';
import Foot from '../components/Footer';

const App = () => {
    return (
        <div>
            我是公共的
            <Route path="/home" component={Home} />
            <Route path="/tbd" component={Tbd} />
        </div>
    )
};

const Routers = () => (
        <Router>
            <div>
                <Route path="/" component={App} />
                <Foot />
            </div>
        </Router>
    );

export default Routers;
