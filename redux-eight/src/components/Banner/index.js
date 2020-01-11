import React from 'react';
import { Carousel } from 'antd';
import './index.css';
const bannerData = [
    { name: 'page one', id: 0 },
    { name: 'page two', id: 1 },
    { name: 'page three', id: 2 },
]
const Banner = ({ data = bannerData }) => {
    return (
        <Carousel autoplay effect='scrollx'>
            {
                data.map(({ name, id }) => {
                    return <div key={id}>{name}</div>
                })
            }
        </Carousel>
    )
};

export default Banner;