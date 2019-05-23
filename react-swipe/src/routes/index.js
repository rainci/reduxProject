import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Layout, } from 'antd'
import Carousel from '../pages/react-swipe'
import SimpleSwiper from '../pages/react-id-swiper'
import OriginSwiper from '../pages/swiper'
import LayOut from '../pages/carouselPage/carouselPage'
// import CarouselPage from '../pages/carousel'
import './router.css'
const { Sider, Content } = Layout;
class RouteMap extends React.Component {
    render() {
        return (
            <Router>
                <div className='navRouter'>
                    <Link to="/swipe">react-swipe</Link>
                    {/* <Link to="/swipeId">react-id-swipe</Link> */}
                    <Link to="/swiper">swiper</Link>
                    <Link to="/carousel">carousel</Link>

                </div>
                <Layout style={{height:'100%'}}>
                    <Switch>
                        {/* <Route path="/swipe" component={Carousel} />
                        <Route path="/swipeId" component={SimpleSwiper} />
                        <Route path="/swiper" component={OriginSwiper} /> */}
                        <Route path="/carousel" component={LayOut} />
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

export default RouteMap;
