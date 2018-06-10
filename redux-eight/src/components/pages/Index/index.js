import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';

import Head from '../../Header';
import Foot from '../../Footer';
import List from '../../pages/List';
import './index.css';

const Index = () => {
    return(
            <Layout>
                <Head />
                <Route path="/list" component={List} />
                <Foot />
            </Layout>         
    )
};

export default Index;