import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Show from './show.js';
const Content = (props)=>{
    return (
        <Layout className='common-content'>
            <Show />
        </Layout>
        
    )  
};

export default Content;
