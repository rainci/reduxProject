import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SliderDemo from '../pages/swipe'
import Carousel from '../pages/react-swipe'
import SimpleSwiper from '../pages/react-id-swiper'

class RouteMap extends React.Component {
    render(){
        return(
            <Router>
                <div>
                <Switch>
                    <Route path="/swipe" component={Carousel} />
                    <Route path="/swipeId" component={SimpleSwiper} />
                </Switch>
                </div>
            </Router>
        )
    }
}

export default RouteMap;
