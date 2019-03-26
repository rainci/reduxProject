/**
 * 
 * @param {Array} menuData  整个组件的data 
 * @param {Array} sampleMenuData 整个组件的平级数据
 * @param {Number} menuSideLine menuside分割线
 * @param {Function(Object={checkedKeys,leaf,relationLeaf})} menuDataCheckedFn  把选中的数据传递出去,checkedKeys为选中的id集, leaf为叶子节点,relationLeaf为关系数据集 
 * @return {component} MenuComponent 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 */
import React,  { PureComponent }  from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import MenuSide  from './menu'
import MenuAlert from './menuAlert'
import { relationLeafFn, filterLeafFn } from './menuAlert/tool'

class MenuComponent extends PureComponent {
    state = {
        showMenuAlertFlag: false,//是否展示弹框 
        menuLightData:[]//高亮的id集   
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//为state设置新的value
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /***********业务方法 begin *****************/
    subMenuItemFn = key => {//左侧menu click cb fn
        this.setState({
            showMenuAlertFlag: true,
            menuAlertData: this.props.sampleMenuData.get(key*1).children
        })
    }
    resetCheckedKeysFn= keys => {//一级左侧menu导航点击文字时触发的函数
        this.setStateValueFn('menuLightData',keys)
        let {sampleMenuData=new Map()} = this.props;
        let leaf = filterLeafFn({data:keys,sampleMenuData})
        let relationLeaf = relationLeafFn({leaf,sampleMenuData})
        this.props.menuDataCheckedFn && this.props.menuDataCheckedFn({checkedKeys:keys,leaf,relationLeaf})
    }
    menuAlertClickFn = ({checkedKeys,leaf, relationLeaf}) => {//menualert click fn
        this.setStateValueFn('menuLightData',checkedKeys)//alert 弹框将选中的parent id传出来供左侧menu使用，点亮左侧menu对应的id
        this.props.menuDataCheckedFn && this.props.menuDataCheckedFn({checkedKeys,leaf,relationLeaf})
    }
    menuAlertCloseFn = () => {//关闭menu弹框 fn
        this.setStateValueFn('showMenuAlertFlag',false)
    }
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { menuCheckedKeys = [] } = nextProps;
        if (menuCheckedKeys && menuCheckedKeys.length) {
            this.setStateValueFn('menuLightData',[...new Set([...menuCheckedKeys])])
        }
    }
    /***********生命周期 end **************/
    render(){
        let { showMenuAlertFlag, menuLightData, menuAlertData } = this.state;
        let {menuData=[], sampleMenuData=new Map()} = this.props;
        return (
            <div style={{'position':'relative','zIndex':2}}>  
                {/* <MenuSide menuSideData={this.state.menuData} menuSideLine={8} subMenuFn={this.subMenuFn} /> */}
                <MenuSide 
                    menuSideStyle = {{}} //menu style
                    menuSideData = {menuData} //menu data
                    sampleMenuData = {sampleMenuData}//平级所有menu数据
                    menuLightData = {menuLightData}//高亮data
                    menuSideLine={8} //分割线
                    subMenuFn = {this.subMenuItemFn}//menu icon点击事件 
                    subMenuCheckFn = {this.resetCheckedKeysFn}//menuitem 本身点击事件
                />
                {
                    showMenuAlertFlag ? 
                    <MenuAlert
                        menuAlertData = {menuAlertData}//当前点开弹框的数据
                        sampleMenuData = {sampleMenuData}//平级所有menu数据
                        closeFn = {this.menuAlertCloseFn}//弹框关闭回调
                        memuCheckedFn= {this.menuAlertClickFn}//点击menu item回调
                        checkedKeys = {menuLightData}//选中高亮的数据
                    />
                    : null
                }

            </div>
        )
    }
}
export default MenuComponent