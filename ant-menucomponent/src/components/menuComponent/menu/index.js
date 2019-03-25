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
import React,  { PureComponent }  from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import './index.less'
import { hasIdFromDataFn } from '../../../utils'
class MenuSide extends PureComponent {
  state = {
    checkedKeysLi: []//选中的id集
  }
  subMenuClick = (tagId, event) => {//当menu item点击时
    let type = event.target.type;
    if (type === 'button') {
      return this.props.subMenuFn && this.props.subMenuFn(tagId)
    }
    let checkedKeysLi = [...new Set([`${tagId}`, ...this.state.checkedKeysLi])];
    this.setState({
      checkedKeysLi
    })
    this.props.subMenuCheckFn && this.props.subMenuCheckFn(checkedKeysLi)
  }
  renderMenuFn = ({menuSideData,subMenuStyle,menuSideLine,subMenuClick}) => {//渲染menuFn
    // debugger
    return menuSideData.map((item,index) => {
      const { tagId, name } = item;
      let classNames;
      if(hasIdFromDataFn(this.state.checkedKeysLi,`${tagId}`)){
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
          {(menuSideLine==index || menuSideLine==(index-1))?<hr/>:null}
        </li>
        
      )
    })
  }
  /***********生命周期 begin **************/
  componentWillReceiveProps(nextProps) {
    const { menuLightData = [] } = nextProps;//当有点亮menu数据时
    if (menuLightData && menuLightData.length) {
        this.setState({
          checkedKeysLi: [...new Set([...menuLightData,...this.state.checkedKeysLi])]
        })
    }

  }
  /***********生命周期 end **************/
  render() {
    let ulStyle = { height: "100%", background: '#2D3049' };
    let { menuSideData = [], menuSideStyle = {},menuSideLine, menuLightData } = this.props;
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
            subMenuClick:this.subMenuClick
          }) 
        }
      </ul>
    );
  }
}

export default MenuSide;





