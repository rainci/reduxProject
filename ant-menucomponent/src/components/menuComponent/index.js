/**
 * 
 * @param {Array} menuData  整个组件的data 
 * @param {Array} sampleMenuData 整个组件的平级数据
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
    /***********业务方法 begin *****************/
    subMenuItemFn = key => {//左侧menu click cb fn
        this.setState({
            showMenuAlertFlag: true,
            menuAlertData: this.props.sampleMenuData.get(key*1).children
        })
    }
    resetCheckedKeysFn= keys => {//一级左侧menu导航点击文字时触发的函数
        this.setState({
            menuLightData: keys       
        })
        let {sampleMenuData=new Map()} = this.props;
        let leaf = filterLeafFn({data:keys,sampleMenuData})
        let relationLeaf = relationLeafFn({leaf,sampleMenuData})
        this.props.menuDataCheckedFn && this.props.menuDataCheckedFn({checkedKeys:keys,leaf,relationLeaf})
    }
    menuAlertClickFn = ({checkedKeys,leaf, relationLeaf}) => {//menualert click fn
        // console.log('menuclickout:',checkedKeys,leaf,relationLeaf)
        this.props.menuDataCheckedFn && this.props.menuDataCheckedFn({checkedKeys,leaf,relationLeaf})
    }
    menuAlertCloseFn = () => {//关闭menu弹框 fn
        this.setState({
            showMenuAlertFlag: false
        })
    }
    checkedMenuItemFn = ids => {//alert 弹框将选中的parent id传出来供左侧menu使用，点亮左侧menu对应的id
        this.setState({
            menuLightData: [...new Set([...ids,...this.state.menuLightData])]
        })
    }
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { menuCheckedKeys = [] } = nextProps;
        if (menuCheckedKeys && menuCheckedKeys.length) {
            this.setState({
                menuLightData: [...new Set([...menuCheckedKeys,...this.state.menuLightData])]
            })
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
                    menuSideStyle={{}} 
                    menuSideData={menuData} 
                    menuLightData={menuLightData} 
                    subMenuFn={this.subMenuItemFn} 
                    subMenuCheckFn={this.resetCheckedKeysFn}
                />
                {
                    showMenuAlertFlag ? 
                    <MenuAlert
                        menuAlertData = {menuAlertData}
                        sampleMenuData = {sampleMenuData}
                        closeFn = {this.menuAlertCloseFn}
                        memuCheckedFn= {this.menuAlertClickFn}
                        checkedKeys = {menuLightData}
                        checkedParentFn={this.checkedMenuItemFn}//将选中的id集输出来 
                        
                    />
                    : null
                }

            </div>
        )
    }
}
export default MenuComponent