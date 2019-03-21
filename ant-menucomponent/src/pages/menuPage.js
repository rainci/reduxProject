import React, { Component } from 'react';
import { Menu, Icon, message, Row, Col } from 'antd';
import server from '../api/server';
import MyMenu  from '../components/menu'
import MenuAlert from '../components/menuAlert'
import {generateList} from '../utils'
class MenuReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuData: [],
            sampleMenuData: new Map(),
            showMenuAlertFlag: false,    
        }
    }
    /***********公共方法 begin *****************/
    getMenuListData = () => {//获取menu data
        return server.getMenuData({'belong': 'tag'}).then((db) => {
          const { code, data = [], msg } = db;
          if (code === 200 || code === '200') {
           return data
          } else {
            message.error(msg)
          }
        })
    }
    /***********公共方法 end *****************/
    getMenuDataFn = () => {//获取menuData
        this.getMenuListData()
        .then(db => {
          console.log(11111111,db)
          if(db.length){
            this.setState({
                menuData: db[0].children,
                sampleMenuData: generateList(db[0].children,true)
            })
          }
        })  
    }
    subMenuFn = key => {//左侧menu click cb fn
        console.log(typeof key, key,this.state)
        this.setState({
            showMenuAlertFlag: true,
            menuAlertData: this.state.sampleMenuData.get(key*1).children
        })
    }
    menuAlertCloseFn = () => {//关闭menu弹框
        this.setState({
            showMenuAlertFlag: false
        })
    }
    menuAlertClickFn = tagId => {//menu click fn
        console.log('menuclickout:',tagId)
    }
    /***********生命周期 begin **************/
    componentDidMount() {
        this.getMenuDataFn()//talelist get data
    }
    /***********生命周期 end **************/
    render() {
        let { showMenuAlertFlag, menuAlertData, sampleMenuData } = this.state;
        return (
            <div>  
                <Row>
                    <Col span={5}>
                        {/* <MyMenu menuListData={this.state.menuData} menuLine={8} subMenuFn={this.subMenuFn} /> */}
                        <MyMenu menuListData={this.state.menuData} subMenuFn={this.subMenuFn} />

                    </Col>
                    <Col span={19}>
                        {
                            showMenuAlertFlag ? 
                            <MenuAlert
                                menuAlertData = {menuAlertData}
                                sampleMenuData = {sampleMenuData}
                                closeFn = {this.menuAlertCloseFn}
                                memuClickFn= {this.menuAlertClickFn}
                                checkedKeys = {["10005", "10014", "10007", "10008", "10514"]}
                            />
                            : null
                        }
                        
                    </Col>
                </Row> 
            </div>
        )
    }
}
export default MenuReset;