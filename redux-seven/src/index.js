import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
// import Routers from './routers/index.js';
import './index.css';
import Siderbar from './components/Siderbar/Siderbar';

const About = () => (<div> About lyx </div>)
const Inbox = () => (<div> Inbox lyx </div>)
const App = (props) => {
    return (
        <div>
            <h1>App</h1>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/inbox">Inbox</Link></li>
            </ul>
            {/*
                接着用 `this.props.children` 替换 `<Child>`
                router 会帮我们找到这个 children
            */}
            {/* {this.props.children} */}
        </div>
    )
}

// ReactDOM.render((
//     <Router history>
//         <Route path="/" component={App}>
//             <Route path="about" component={About} />
//             <Route path="inbox" component={Inbox} />
//         </Route>
//     </Router>
// ), document.getElementById('root'));
ReactDOM.render(<Siderbar />, document.getElementById('root'));
