import React from 'react';
import { Layout, Row, Col, Icon } from 'antd';
import './index.css';
const Show = () => {
    return (
        <Layout>
            <Row gutter={16} className='index-show1'>
                <Col span={6}>
                    <Icon type='lock' /><br/>
                    <span>安全保障</span>
                </Col>
                <Col span={6}>
                    <Icon type='coffee' /><br/>
                    <span>新手专享</span>
                </Col>
                <Col span={6}>
                    <Icon type='gift' /><br/>
                    <span>满标有礼</span>
                </Col>
                <Col span={6}>
                    <Icon type='user' /><br/>
                    <span>邀请好友</span>
                </Col>
            </Row>
            <Row type="flex" justify="space-between" className='index-show2'>
                <Col span={7}>
                    <h4>累计成交额</h4>
                    <p>1405万</p>
                </Col>
                <Col span={7}>
                    <h4>用户注册数量</h4>
                    <p>38901人</p>
                </Col>
                <Col span={7}>
                    <h4>平台稳定运营</h4>
                    <p>1234天</p>
                </Col>
            </Row>
        </Layout>     
    );
};
export default Show;
