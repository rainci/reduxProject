import { Breadcrumb, Icon } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
const Bread = () => {
    return(  
        <Breadcrumb style={{padding:'10px 2px'}} separator=">">
            <Breadcrumb.Item>
                <Icon type="home" />  Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            <a href="/a"><Icon type="user" /> Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item><a href="/b">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
    )
}
export default Bread;