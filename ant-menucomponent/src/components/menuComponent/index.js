import React,  { PureComponent }  from 'react';
import { Menu, Row, Col, Icon, Button } from 'antd';
import MyMenu  from './menu'
import MenuAlert from './menuAlert'

class MenuComponent extends PureComponent {
    state = {
        showMenuAlertFlag: false,//是否展示弹框 
        menuLightData:[]//高亮的id集   
    }
    /***********业务方法 begin *****************/
    subMenuItemFn = key => {//左侧menu click cb fn
        console.log(typeof key, key,this.state)
        this.setState({
            showMenuAlertFlag: true,
            menuAlertData: this.props.sampleMenuData.get(key*1).children
        })
    }
    menuAlertClickFn = ({checkedKeys,leaf, relationLeaf}) => {//menu click fn
        console.log('menuclickout:',checkedKeys,leaf,relationLeaf)
    }
    menuAlertCloseFn = () => {//关闭menu弹框 fn
        this.setState({
            showMenuAlertFlag: false
        })
    }
    checkedMenuItemFn = parentData => {//alert 弹框将选中的parent id传出来供左侧menu使用，点亮左侧menu对应的id
        console.log(11123,parentData)
        this.setState({
            menuLightData: parentData
        })
    }
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeysaa = [] } = nextProps;
        if (checkedKeysaa && checkedKeysaa.length) {
            this.setState({
                menuLightData: [...new Set([...checkedKeysaa,...this.state.menuLightData])]
            })
        }
    }
    /***********生命周期 end **************/
    render(){
        console.log('conindex')
        let { showMenuAlertFlag, menuLightData, menuAlertData } = this.state;
        let {menuData=[], sampleMenuData=new Map()} = this.props;
        return (
            <div style={{'position':'relative','zIndex':2}}>  
                {/* <MyMenu menuListData={this.state.menuData} menuLine={8} subMenuFn={this.subMenuFn} /> */}
                <MyMenu style={{}} menuListData={menuData} subMenuFn={this.subMenuItemFn} menuLightData={menuLightData} />
                {
                    showMenuAlertFlag ? 
                    <MenuAlert
                        menuAlertData = {menuAlertData}
                        sampleMenuData = {sampleMenuData}
                        closeFn = {this.menuAlertCloseFn}
                        memuCheckedFn= {this.menuAlertClickFn}
                        checkedKeys = {menuLightData}
                        checkedParentFn={this.checkedMenuItemFn}//将选中的parentid集输出来 
                        
                    />
                    : null
                }

            </div>
        )
    }
}
export default MenuComponent