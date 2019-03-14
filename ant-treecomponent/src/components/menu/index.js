/* eslint-disable  */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const menuList = [
  {
    id: 1,
    url: '/',
    name: 'tag tree'
  },
  {
    id: 2,
    url: '/tablelist',
    name: 'table list'
  },
  {
    id: 3,
    url: '/dateshow',
    name: 'date show'
  },
  {
    id: 4,
    url: '/echart',
    name: 'echart demo'
  },
  {
    id: 5,
    url: '/menu',
    name: 'menu demo'
  },
]
class MyMenu extends React.Component {
  state = {
    collapsed: true,
  }
  render() {

    const menuProps = {
      style: { height: "100%" },
      theme: "dark",
      mode: "inline",
      defaultSelectedKeys:['1'],
      inlineCollapsed: this.state.collapsed
    }
    return (
      <div style={{ height: "100%" }}>
        <Menu
          {...menuProps}
        >
          {
            menuList.map(item => {
              const { id, url, name } = item;
              return (
                <Menu.Item key={id}><Link to={url}>{name}</Link></Menu.Item>)
            })
          }
        </Menu>
      </div>
    );
  }
}

export default MyMenu;





