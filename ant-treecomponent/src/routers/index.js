import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TagTree from '../pages/tagTree';
import TableList from '../pages/tableList';
class Routers extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={TagTree} />
                    <Route path="/tablelist" component={TableList} />
                </div>
            </Router>
        )
    }
}

export default Routers;