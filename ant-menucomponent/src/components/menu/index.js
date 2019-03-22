/* eslint-disable  */
import React from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import './index.less'
const SubMenu = Menu.SubMenu;
class MyMenu extends React.Component {
  state = {
    checkedKeysLi: []
  }
  hasClickIdFn = (data = [], tagId) => {//判断tagId是否在data数组中
    if (data.includes(tagId)) {
      return true;
    }
    return false;
  }
  subMenuClick = (tagId, event) => {
    let type = event.target.type;
    if (type === 'button') {
      return this.props.subMenuFn && this.props.subMenuFn(tagId)
    }
    this.setState({
      checkedKeysLi: [tagId, ...this.state.checkedKeysLi]
    })
  }
  renderMenuFn = ({menuListData,subMenuStyle,menuLine=8,subMenuClick}) => {//渲染menuFn
    // debugger
    return menuListData.map((item,index) => {
      const { tagId, name } = item;
      let classNames;
      if(this.hasClickIdFn(this.state.checkedKeysLi,tagId)){
          classNames = 'checkedMenuItem';    
      }
      return (
        <li
          className={classNames}
          style={subMenuStyle}
          key={tagId}
          id={tagId}
          onClick={subMenuClick.bind(this,tagId)}
        >
          {name}
          <Button className='menuButton' icon="right"></Button>
          {(menuLine==index || menuLine==(index-1))?<hr/>:null}
        </li>
        
      )
    })
  }
  render() {
    let ulStyle = { height: "100%", background: '#2D3049' };
    let { menuListData = [], menuStyle = {},menuLine } = this.props;
    ulStyle = { ...ulStyle, ...menuStyle };
    let subMenuStyle = { 'width': '50%', 'float': 'left' };
    return (
      <ul className='menuUl' style={ulStyle}>
        {
          this.renderMenuFn({
            menuListData,
            subMenuStyle,
            menuLine,
            subMenuClick:this.subMenuClick
          }) 
        }
      </ul>
    );
  }
}

export default MyMenu;





