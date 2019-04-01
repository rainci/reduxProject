/**
 * 
 * @param {Array} menuAlertData 可选 弹框数据
 * @param {Object} menuAlertStyle 可选 弹框样式
 * @return {component} MenuAlert 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 */
import React, { PureComponent } from 'react';
import { Icon, Row } from 'antd';
import { hasIdFromDataFn, deleteIdFromData } from '../../../utils'
import { getParentIdAndName, relationLeafFn, filterLeafFn } from './tool'
import { getChildrenIds } from '../menu/tool';
import './index.less'
class MenuAlert extends PureComponent {
    state = {
        menuAlertCheckedKeys: this.props.checkedKeys || [],//弹框选中的id
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//为state设置新的value
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /***********业务方法 begin *****************/
    alertCloseFn = () => {//close alert fn
        this.props.closeFn && this.props.closeFn()
    }
    memuClickFn = tagId => {// menu tag click fn
        let { menuAlertCheckedKeys } = this.state;
        let status = hasIdFromDataFn(menuAlertCheckedKeys, `${tagId}`);//是否是选中状态true or false
        let endKeys;
        if (status) {//当前选中状态，则取消选中
            endKeys = this.unCheckMenuFn(menuAlertCheckedKeys,tagId)
        } else {//当前未选中状态，则选中
            endKeys = this.checkMenuFn(tagId);
        }
        this.checkedWorkFn(endKeys);
    }
    checkMenuFn = tagId => {//选中checked
        let { secletIds } = getParentIdAndName({//获取当前点击tag的自身和父亲的id集
            currentId: tagId,
            sampleTreeData: this.props.sampleMenuData,
        });
        let menuAlertCheckedKeys = [...new Set([...secletIds, ...this.state.menuAlertCheckedKeys])];//当前弹窗选中的所有id
        this.setStateValueFn('menuAlertCheckedKeys',menuAlertCheckedKeys)
        return menuAlertCheckedKeys;
    }
    unCheckMenuFn = (menuAlertCheckedKeys,tagId) => {//未选中unchecked
        let newMenuAlertCheckedKeys = deleteIdFromData([...menuAlertCheckedKeys], `${tagId}`)
        let children = this.props.sampleMenuData && this.props.sampleMenuData.get(tagId * 1).children
        if (!children || children.length === 0) {
            this.setStateValueFn('menuAlertCheckedKeys', newMenuAlertCheckedKeys)
            return newMenuAlertCheckedKeys
        }
        let childrenIds = getChildrenIds(children);
        let checkedKeysNoChild = newMenuAlertCheckedKeys.filter(item => !childrenIds.includes(item))
        this.setStateValueFn('menuAlertCheckedKeys', checkedKeysNoChild)
        return checkedKeysNoChild;
    }
    checkedWorkFn = (checkedKeys) => {//select后要工作的内容
        let { sampleMenuData } = this.props;
        let leaf = filterLeafFn({ data: checkedKeys, sampleMenuData })
        let relationLeaf = relationLeafFn({ leaf, sampleMenuData })
        this.props.memuCheckedFn && this.props.memuCheckedFn({ checkedKeys, leaf, relationLeaf })

    }
    /***********渲染方法 begin *****************/
    /**
     * 
     * @param {Array} data 
     * @return {string[]} 
     * @author rainci(刘雨熙)
     * 渲染treeNode
     */
    renderNodes = (data = []) => { //渲染treeNode二级数据
        return data.map((item,index) => {
            let { name, tagId, children } = item;
            let classNames;
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItemTwo';
            }
            let navTwo = index === 0 ? 'borderTopNull' : ''
            if (children && children.constructor.name === 'Array' && children.length) {
                return (
                    <div className={`clearfix hasChildrenBox ${navTwo}`} key={tagId}>
                        <h2 title={name} key={tagId} id={tagId} className='clearfix textLeft' onClick={this.memuClickFn.bind(this, tagId)}>
                            <span className={`menuItemTwo ${classNames}`}>{name}</span>
                        </h2>
                        {this.renderNodesChildren(children)}
                    </div>
                )
            }
            return <h2 title={name} key={tagId} id={tagId} className='floatLeft marginRight20'  onClick={this.memuClickFn.bind(this, tagId)}><span className={`menuItemTwo ${classNames}`}>{name}</span></h2>
        })
    }
    renderNodesChildren = (data = []) => { //渲染三级数据
        return data.map(item => {
            let { name, tagId, children } = item;
            let classNames;
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItemThree';
            }
            return (
                <div className='floatLeft threeBox' key={tagId}>
                    <h2 title={name} key={tagId} id={tagId} className='menuItemThree' onClick={this.memuClickFn.bind(this, tagId)}>
                        <span className={classNames}>{name}</span>
                    </h2>
                    {
                        (children && children.constructor.name === 'Array' && children.length) ?
                            <ul className='floatLeft padRight20 menuThreeUl'>
                                {this.renderNodesChildrenFour(children)}
                            </ul> : null
                    }


                </div>
            )
        })
    }
    renderNodesChildrenFour = (data = []) => {//渲染四级数据
        return data.map(item => {
            let { name, tagId } = item;
            let classNames;
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItemFour';
            }
            return (
                <li key={tagId} className='cursor' onClick={this.memuClickFn.bind(this, tagId)}>
                    <span className={classNames}>{name}</span>
                </li>
            )
        })
    }
    /***********渲染方法 end *****************/
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeys = [] } = nextProps;
        this.setStateValueFn('menuAlertCheckedKeys',checkedKeys)
    }
    /***********生命周期 end **************/
    render() {
        let { menuAlertData, menuAlertStyle } = this.props;
        return (
            <div className='menuAlert' style={menuAlertStyle}>
                <Row className='rowHeight'>
                    <Icon className='closeIcon' type="close" onClick={this.alertCloseFn} />
                </Row>
                {menuAlertData ? this.renderNodes(menuAlertData) : null}
            </div>
        )
    }
}

export default MenuAlert