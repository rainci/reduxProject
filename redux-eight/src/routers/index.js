import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Tbd from './Tbd';
import Foot from '../components/Footer';

const App = () => {
    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/tbd" component={Tbd} />
            <Route path="/my" component={My} />
        </div>
    )
};
const My = () => (<p>my haha</p>)

const Routers = () => (
        <Router>
            <div>
                <Route path="/" component={App} />
                <Foot />
            </div>
        </Router>
    );

export default Routers;
