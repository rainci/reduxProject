import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from '../../logo.svg';
import './Siderbar.css';
import Date from '../Date/Date';
import Buttons from '../Button/Button';
import Bread from '../Breadcrumb/Breadcrumb';
import Dropdowns from '../Dropdown/Dropdown';
import Side from '../Sider/Sider';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Siderbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
            mode: 'inline',
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render(){
        let { collapsed, mode } = this.state;
        return (
            <Layout>
                <Side collapse={collapsed} mode={mode} />
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Bread />
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                            <Date />  
                            <Buttons />
                            <Dropdowns />
                        </div>
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Siderbar;