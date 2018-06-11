import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Layout } from 'antd';

import Head from '../../Header';
import Foot from '../../Footer';
import Banner from '../../Banner';
import List from '../../pages/List';
import Content from './content';

import './index.css';

const Index = () => {
    return(
            <Layout>
                <Head />
                <Banner />
                <Content />
                {/* <Route path="/list" component={List} /> */}
                <Foot />
            </Layout>         
    )
};

export default Index;