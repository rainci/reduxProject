import React, { Component } from 'react';
import { Layout, Carousel } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const Banner = (props) => (
    <Carousel autoplay effect='scrollx'>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
    </Carousel>
);

export default Banner;