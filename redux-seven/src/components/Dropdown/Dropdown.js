import { Menu, Dropdown, Icon, message } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const onClick = function ({ key }) {
    message.info(`Click item ${key}`);
};
const SubMenu = Menu.SubMenu;
const menu = (
    <Menu onClick = {onClick}>
        <Menu.Item key="0">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <Menu.Item key="3" disabled>3rd menu item（disabled）</Menu.Item>
    </Menu>
);
const Dropdowns = () => {
    return(
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
            Cascading menu <Icon type="down" />
            </a>
        </Dropdown>
        
    )
};
export default Dropdowns;