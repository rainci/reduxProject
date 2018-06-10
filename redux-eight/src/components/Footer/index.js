
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Icon, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import logo from '../../logo.svg';
// const { Footer } = Layout;

const Foot = () => {
    return(
        <div className="common-foot">
            <Row>
                <Col span={6}>
                    <Link to="/">
                        <Icon type="home" /><br/>
                        首页
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/list">
                        <Icon type="red-envelope" /><br/>
                        项目
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/find">
                        <Icon type="compass" /><br/>
                        发现
                        </Link>
                </Col>
                <Col span={6}>
                    <Link to="/my">
                        <Icon type="user" /><br/>
                        我的
                    </Link>
                </Col>
            </Row>
        </div>
        // <Menu mode="horizontal">  
        //     <Menu.Item key="index">
        //         <Icon type="home" />
        //         首页
        //     </Menu.Item>
        //     <Menu.Item key="index">
        //         <Icon type="red-envelope" />
        //         项目
        //     </Menu.Item>
        //     <Menu.Item key="index">
        //         <Icon type="compass" />
        //         发现
        //     </Menu.Item>
        //     <Menu.Item key="index">
        //         <Icon type="user" />
        //         我的
        //     </Menu.Item>
        // </Menu>
    )
};
export default Foot;