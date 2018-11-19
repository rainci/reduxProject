import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './main';

class Routers extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route path="/main" component={Main} />
                </div>
            </Router>
        )
    }
}

export default Routers;
