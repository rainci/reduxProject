import React, { Component } from 'react';
import { Menu, Icon, message } from 'antd';
import server from '../api/server';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function handleClick(e) {
    console.log('click', e);
  }
class MenuReset extends Component {
    getTableListData = () => {//获取tablelist data
        return server.getMenuData().then((db) => {
          const { code, data = [] } = db;
          if (code === 200 || code === '200') {
           return data
          } else {
            message.error(db.msg)
          }
        })
    }
    getTableDataFn = () => {
        this.getTableListData()
        .then(db => {
          console.log(11111111,db)
        })
    }
    componentDidMount() {
        this.getTableDataFn()//talelist get data
      }
    render() {
        return (
            <Menu onClick={handleClick}  style={{ width: 256 }} mode="vertical">
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                    <SubMenu key="sub11" title="Item 1">
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                    </SubMenu>
                    <MenuItemGroup title="Iteom 2" onClick={handleClick}>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
export default MenuReset;