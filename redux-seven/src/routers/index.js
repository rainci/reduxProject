import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Side from '../components/Sider';
import Siderbar from '../components/Siderbar';

import Date from '../components/Date';
import { Divider,  Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Routers = () => (
    <div>
        <Router>
            <Route path="/" component={Siderbar} />
        </Router>
    </div>  
    );

export default Routers;
