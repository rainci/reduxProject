import React, { Component } from 'react';
import { Menu, Icon, message, Row, Col } from 'antd';
import server from '../api/server';
import MenuComponent from '../components/menuComponent'
import { generateList } from '../utils'
class MenuReset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuData: [],
            sampleMenuData: new Map(),
        }
    }
    /***********公共方法 begin *****************/
    getMenuListData = () => {//获取menu data
        return server.getMenuData({ 'belong': 'sort' }).then((db) => {
            const { code, data = [], msg } = db;
            if (code === 200 || code === '200') {
                return data
            } else {
                message.error(msg)
            }
        })
    }
    /***********公共方法 end *****************/
    /***********业务方法 begin *****************/
    getMenuDataFn = () => {//获取menuData
        this.getMenuListData()
            .then(db => {
                if (db.length) {
                    this.setState({
                        menuData: db[0].children,
                        sampleMenuData: generateList(db[0].children, true)
                    })
                }
            })
    }
    aaaFn = ({checkedKeys,leaf,relationLeaf}) => {
        console.log('wawo,the end data:',checkedKeys,leaf,relationLeaf)
        this.setState({
            menuCheckedKeys: checkedKeys  
        })
    }
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentDidMount() {
        this.getMenuDataFn()//talelist get data
    }
    /***********生命周期 end **************/
    render() {
        let { menuData, sampleMenuData, menuCheckedKeys=[] } = this.state;
        return (
            <Row>
                <Col span={5}>
                    <MenuComponent 
                        menuData={menuData}    
                        sampleMenuData={sampleMenuData}
                        menuCheckedKeys={menuCheckedKeys}
                        // menuSideLine={8}
                        menuDataCheckedFn={this.aaaFn}
                        // menuSideStyle = {{'height':'800px'}}
                        // menuAlertStyle = {{'height':'800px'}}
                    />
                </Col>
                <Col span={15} style={{'textAlign':'left'}}>
                    aaaaaaaaaa
            </Col>
            </Row>
        )
    }
}
export default MenuReset;