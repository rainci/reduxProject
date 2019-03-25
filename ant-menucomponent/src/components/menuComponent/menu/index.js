/**
 * 
 * @param {Array} menuSideData 必选 menu树data
 * @param {Array} menuLightData 可选 高亮data
 * @param {Object}  menuSideStyle 可选 menuSide style
 * @param {Number}  menuSideLine 可选 导航线
 * @param {Function(tagId)} subMenuFn 点击icon触发的fn 
 * @param {Function(Array)} subMenuCheckFn 点击menuItem文字触发的fn 
 * @return {component} MenuSide 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 */
/* eslint-disable  */
import React, { PureComponent } from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import './index.less';
import { hasIdFromDataFn, deleteIdFromData } from '../../../utils';
import { getChildrenIds } from './tool';
class MenuSide extends PureComponent {
  state = {
    menuSideCheckedKeys: []//选中的id集
  }
  /***********公共方法 begin *****************/
  setStateValueFn = (key, value) => {//为state设置新的value
    this.setState({
      [key]: value
    })
  }
  /***********公共方法 end *****************/
  /***********业务方法 begin *****************/
  subMenuClick = (tagId, event) => {//当menu item点击时
    let type = event.target.type;
    if (type === 'button') {//当点击icon时
      return this.props.subMenuFn && this.props.subMenuFn(tagId)
    }
    // debugger
    let { menuSideCheckedKeys } = this.state;
    let status = hasIdFromDataFn(menuSideCheckedKeys, `${tagId}`);//是否是选中状态true or false
    if (status) {//当前选中状态，则取消选中
      this.unCheckSubMenuFn(menuSideCheckedKeys, tagId)
    } else {//未选中,应选中
      this.checkSubMenuFn(menuSideCheckedKeys, tagId)
    }

  }
  unCheckSubMenuFn = (menuSideCheckedKeys, tagId) => {//取消选中
    let newMenuSideCheckedKeys = deleteIdFromData([...menuSideCheckedKeys], `${tagId}`)
    let children = this.props.sampleMenuData && this.props.sampleMenuData.get(tagId * 1).children
    if (!children || children.length === 0) {
      this.setStateValueFn('menuSideCheckedKeys', newMenuSideCheckedKeys)
      return this.props.subMenuCheckFn && this.props.subMenuCheckFn(newMenuSideCheckedKeys)
    }
    let childrenIds = getChildrenIds(children);
    let checkedKeysNoChild = newMenuSideCheckedKeys.filter(item => !childrenIds.includes(item))
    this.setStateValueFn('menuSideCheckedKeys', checkedKeysNoChild)
    return this.props.subMenuCheckFn && this.props.subMenuCheckFn(checkedKeysNoChild)

  }
  checkSubMenuFn = (menuSideCheckedKeys, tagId) => {//选中
    let newmenuSideCheckedKeys = [...new Set([`${tagId}`, ...menuSideCheckedKeys])];
    this.setStateValueFn('menuSideCheckedKeys', newmenuSideCheckedKeys)
    this.props.subMenuCheckFn && this.props.subMenuCheckFn(newmenuSideCheckedKeys)
  }
  renderMenuFn = ({ menuSideData, subMenuStyle, menuSideLine, subMenuClick }) => {//渲染menuFn
    // debugger
    return menuSideData.map((item, index) => {
      const { tagId, name } = item;
      let classNames;
      if (hasIdFromDataFn(this.state.menuSideCheckedKeys, `${tagId}`)) {
        classNames = 'checkedMenuItem';
      }
      return (
        <li
          className={classNames}
          style={subMenuStyle}
          key={tagId}
          id={tagId}
          onClick={subMenuClick.bind(this, tagId)}
        >
          {name}
          <Button className='menuButton' icon="right"></Button>
          {(menuSideLine == index || menuSideLine == (index - 1)) ? <hr /> : null}
        </li>

      )
    })
  }
  /***********业务方法 end *****************/
  /***********生命周期 begin **************/
  componentWillReceiveProps(nextProps) {
    const { menuLightData = [] } = nextProps;//当有点亮menu数据时
    if (menuLightData && menuLightData.length) {
      this.setState({
        menuSideCheckedKeys: [...new Set([...menuLightData])]
      })
    }

  }
  /***********生命周期 end **************/
  render() {
    let ulStyle = { height: "100%", background: '#2D3049' };
    let { menuSideData = [], menuSideStyle = {}, menuSideLine, menuLightData } = this.props;
    ulStyle = { ...ulStyle, ...menuSideStyle };
    let subMenuStyle = { 'width': '50%', 'float': 'left' };
    return (
      <ul className='menuUl' style={ulStyle}>
        {
          this.renderMenuFn({
            menuSideData,//menu data
            subMenuStyle,//menu style
            menuSideLine,//menu line
            menuLightData,//menu高亮
            subMenuClick: this.subMenuClick
          })
        }
      </ul>
    );
  }
}

export default MenuSide;





