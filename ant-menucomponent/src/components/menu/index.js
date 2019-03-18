/* eslint-disable  */
import React from 'react';
import { Menu, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
class MyMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: ''
    }
  }
  subMenuClick = ({key}) => {
    console.log('click ', key);
    this.setState({
      current: key,
    });
    this.props.subMenuFn && this.props.subMenuFn(key)
  }

  render() {
    const menuProps = {
      style: { height: "100%" },
      theme: "dark",
      mode: "vertical",
      defaultSelectedKeys:['10'],
      selectedKeys:[`${this.state.current}`]
    };
    console.log('menuProps:',menuProps,this.state)
    let navStyle = { height: "100%" };
    let { menuListData = [], menuStyle={} } = this.props;
    navStyle = {...navStyle,...menuStyle};
    let subMenuStyle = {'width':'50%','float':'left'};
    return (
      <div style={navStyle}>
        <Menu
          {...menuProps}
        >
          {
            menuListData.map(item => {
              const { tagId, name } = item;
              return (
                    <SubMenu 
                    style={subMenuStyle}
                    key={tagId} 
                    title={name}
                    onTitleClick={this.subMenuClick}
                  />
               
                )
            })
          }
        </Menu>
      </div>
    );
  }
}

export default MyMenu;





