import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route } from 'react-router';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import Routers from './routers/index.js';
import './index.css';
import Siderbar from './components/Siderbar/Siderbar';

const About = () => (
    <div> 
        lyx about 
    </div>
);
const Inbox = () => (
    <div> 
        lyx inbox
    </div>
);
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
// ReactDOM.render(
//     <BrowserRouter>
//         <div>
//             <Route path="/" component={App} />
//             <Route path="/about" component={About} />
//             <Route path="/inbox" component={Inbox} />
//         </div>  
        
//         {/* </Route> */}
//     </BrowserRouter>
// , document.getElementById('root'));
// ReactDOM.render((
//     <Router history = {{browserHistory}}>
//         <Route path="/" component={App}>
//             <Route path="about" component={About} />
//             <Route path="inbox" component={Inbox} />
//         </Route>
//     </Router>
// ), document.getElementById('root'));
// ReactDOM.render(<Siderbar />, document.getElementById('root'));
ReactDOM.render(<Routers />, document.getElementById('root'));