import React from 'react'
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
const App = React.createClass({
    render() {
      return (
        <div>
          <h1>App</h1>
          {/* 把 <a> 变成 <Link> */}
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
          </ul>
  
          {/*
            接着用 `this.props.children` 替换 `<Child>`
            router 会帮我们找到这个 children
          */}
          {this.props.children}
        </div>
      )
    }
  })

const Home = () => <div>home</div>

const Routers = () => {
    return (
        <Router>
            <Route path="/" component={App}>
                <Route path="about" component={Home} />
            </Route>
        </Router>
    )
};

export default Routers;
