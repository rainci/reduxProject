import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Show from './show.js';
const Content = (props)=>{
    // let { mess } = props;
    return (
        <Layout className='common-content'>
            <Show />
        </Layout>
        
    )  
};

export default Content;

// {
//     mess.each((mes,key) => {
//         return <li><Link to='${mes.url}'>mes.title</Link></li>
//     })
// }