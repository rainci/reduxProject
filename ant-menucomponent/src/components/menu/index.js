/**
 * 
 */
/* eslint-disable  */
import React,  { PureComponent }  from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import './index.less'
class MyMenu extends PureComponent {
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
      checkedKeysLi: [...new Set([tagId, ...this.state.checkedKeysLi])]
    })
  }
  renderMenuFn = ({menuListData,subMenuStyle,menuLine,subMenuClick}) => {//渲染menuFn
    // debugger
    return menuListData.map((item,index) => {
      const { tagId, name } = item;
      let classNames;
      if(this.hasClickIdFn(this.state.checkedKeysLi,`${tagId}`)){
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
  /***********生命周期 begin **************/
  componentWillReceiveProps(nextProps) {
    const { menuLightData = [] } = nextProps;
    if (menuLightData && menuLightData.length) {
        this.setState({
          checkedKeysLi: [...new Set([...menuLightData,this.state.checkedKeysLi])]
        })
    }

  }
  /***********生命周期 end **************/
  render() {
    let ulStyle = { height: "100%", background: '#2D3049' };
    let { menuListData = [], menuStyle = {},menuLine, menuLightData } = this.props;
    ulStyle = { ...ulStyle, ...menuStyle };
    let subMenuStyle = { 'width': '50%', 'float': 'left' };
    return (
      <ul className='menuUl' style={ulStyle}>
        {
          this.renderMenuFn({
            menuListData,//menu data
            subMenuStyle,//menu style
            menuLine,//menu line
            menuLightData,//menu高亮
            subMenuClick:this.subMenuClick
          }) 
        }
      </ul>
    );
  }
}

export default MyMenu;





