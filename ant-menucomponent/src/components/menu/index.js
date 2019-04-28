/* eslint-disable  */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class MyMenu extends React.Component {
  state = {
    collapsed: true,
  }
  render() {
    const { menuList } = this.props;
    const menuProps = {
      style: { height: "100%" },
      theme: "dark",
      mode: "inline",
      defaultSelectedKeys:['1'],
      inlineCollapsed: this.state.collapsed
    }
    return (
      <div className='demoMenu' style={{ height: "100%" }}>
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





