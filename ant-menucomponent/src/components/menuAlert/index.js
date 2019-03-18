import React, { Component } from 'react';
import { Icon, Row, Col } from 'antd';

import './index.css'
class MenuAlert extends Component {
    alertCloseFn = () => {
        this.props.closeFn && this.props.closeFn()
    }
    /**
     * 
     * @param {Array} data 
     * @return {string[]} 
     * @author rainci(刘雨熙)
     * 渲染treeNode
     */
    renderTreeNodes = (data = []) => { //渲染treeNode
        return data.map(item => {
            let { name, tagId, children} = item;

            if (children && children.constructor.name === 'Array' && children.length) {
                return (
                    <h2 title={name} key={tagId} dataRef={item} id={tagId}>
                        {name}
                    </h2>
                     
                )
            }
            return <h2 title={name} key={tagId} dataRef={item} id={tagId} >{name}</h2>
        })
    }
    render(){
        let { menuAlertData } = this.props;
        console.log('menuAlertData:',menuAlertData)
        return (
            <div className='menuAlert'>
                <Row>
                    <Col span={2} offset={22}><Icon type="close" onClick={this.alertCloseFn} /></Col>
                </Row> 
                {this.renderTreeNodes(menuAlertData)}
            </div>
        )
    }
}

export default MenuAlert