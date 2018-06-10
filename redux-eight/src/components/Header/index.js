import { Layout, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from '../../logo.svg';
const { Header } = Layout;
const Head = (props) => (
    <Header style = {{'background':'#ffffff','textAlign':'center'}}>
        <Icon type='user' />刘雨熙
    </Header>
);
export default Head;