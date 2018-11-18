import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './main';

class Routers extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/main" component={Main} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routers;
