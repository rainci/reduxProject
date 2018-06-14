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


const ParamsExample = () => (
    <BrowserRouter>
      <div>
        <h2>Accounts</h2>
        <ul>
          <li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>
        </ul>
  
        <Route path="/:id" component={Child} />
  
        {/*
           It's possible to use regular expressions to control what param values should be matched.
              * "/order/asc"  - matched
              * "/order/desc" - matched
              * "/order/foo"  - not matched
        */}
        <Route
          path="/order/:direction(asc|desc)"
          component={ComponentWithRegex}
        />
      </div>
    </BrowserRouter>
  );
  
  const Child = ({ match }) => (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
  
  const ComponentWithRegex = ({ match }) => (
    <div>
      <h3>Only asc/desc are allowed: {match.params.direction}</h3>
    </div>
  );
  
// export default Routers;
export default ParamsExample;
// export default {Routers,ParamsExample};
