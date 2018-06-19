import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Tbd from './Tbd';
import Foot from '../components/Footer';

const App = () => {
    return (
        <div>
            {/* switch是：路由/tbd,则开始查找，找到对应path的Route后，渲染，停止往下 查找 */}
            <Switch>    
            <Route path="/tbd" component={Tbd} />
            <Route path="/my" component={My} />
            <Route exact  path="/" component={Home} />
            </Switch> 
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
