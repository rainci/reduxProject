import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/Header';
import Banner from '../../components/Banner';
import Content from './content';

import './index.css';

const Home = () => {
    return(
            <Layout>
                <Head />
                <Banner />
                <Content />
            </Layout>         
    )
};

export default Home;