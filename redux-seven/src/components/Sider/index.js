import { Layout, Menu, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Side = (props) => {
    let { collapse, mode } = props;
    return (

        <Sider collapsible collapsed={collapse}>
            <Menu theme="dark" mode={mode} defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/main">
                        <Icon type="user" />
                        <span className="nav-text">hello</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/main/date">
                        <Icon type="video-camera" />
                        <span className="nav-text">date</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/main/pagelist">
                        <Icon type="upload" />
                        <span className="nav-text">pagelist</span>
                    </Link>
                </Menu.Item>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </Sider>
    )
};
export default Side;