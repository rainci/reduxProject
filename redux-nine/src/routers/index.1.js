import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Tbd from './Tbd'
import Home from './Home'


const Foot = () => {
  return (
    <ul>
      <li>
        <Link to="/">（home）</Link>
      </li>
      <li>
        <Link to="/tbd">Company (tbd)</Link>
      </li>
    </ul>
  )
}
const App = () => {
  return (
    <div>
      我是公共的
      <Foot />
      <Route exact path="/" component={Home} />
      <Route path="/tbd" component={Tbd} />
     
    </div>
  )
}
const Routers = () => (
  <div>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">home路由</Link></li>
          <li><Link to="/params">params路由</Link></li>
          <li><Link to="/log">log路由</Link></li>
        </ul>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/params" component={ParamsExample} />
          <Route path="/log" render={()=>(<p>log路由</p>)} />
        </div>
      </div>
    </BrowserRouter>
  </div>
);


const ParamsExample = () => (
  <div>
    <h2>Accounts</h2>
    <ul>
      <li>
        <Link to="netflix">Netflix</Link>
      </li>
      <li>
        <Link to="zillow-group">Zillow Group</Link>
      </li>
      <li>
        <Link to="yahoo">Yahoo</Link>
      </li>
      <li>
        <Link to="modus-create">Modus Create</Link>
      </li>
    </ul>
    <Route path=":id" component={Child} />
  </div>
);

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);


export default Routers;
// export default ParamsExample;
// export default {Routers,ParamsExample};
