import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Divider,  Layout } from 'antd';
import Index from '../components/pages/Index';
import List from '../components/pages/List';

const Routers = () => (
    <div>
        <Router>
            <Route path="/" component={Index} />
        </Router>
    </div>  
    );

export default Routers;
