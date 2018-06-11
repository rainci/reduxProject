import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Divider,  Layout } from 'antd';
import Index from '../components/pages/Index';
import List from '../components/pages/List';

const Routers = () => (
    <div>
        <Router>
            <div>
                <Route path="/" component={Index} />
                <Route path="/list" component={List} />
            </div>
        </Router>
    </div>
    );

export default Routers;
