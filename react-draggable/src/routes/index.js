import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import DragPage from '../pages/dragPage'
class RouteMap extends React.Component {
    render(){
        return(
            <Router>
                <div>
                <Switch>
                    <Route path="/drag" component={DragPage} />
                </Switch>
                </div>
            </Router>
        )
    }
}

export default RouteMap;
