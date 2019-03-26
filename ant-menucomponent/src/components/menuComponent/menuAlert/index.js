/**
 * 
 * @param {Array} treeData 
 * @param {Array} checkedKeys
 * @param {Array}  expandedKeys
 * @param {Number} 可选 treeHeight
 * @param {boolean} autoExpandParent 
 * @param {Function(Array)} checkedParentFn  把选中过的弹框的父id集传出去  
 * @return {component} MenuAlert 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 */
import React, { PureComponent } from 'react';
import { Icon, Row, Col } from 'antd';
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
        if (status) {//当前选中状态，则取消选中
            this.unCheckMenuFn(menuAlertCheckedKeys,tagId)
        } else {//当前未选中状态，则选中
            this.checkMenuFn(tagId);
        }
        setTimeout(() => {
            const { menuAlertCheckedKeys } = this.state;
            this.checkedWorkFn(menuAlertCheckedKeys);
        }, 10)
        // this.props.memuClickFn && this.props.memuClickFn(tagId)
    }
    checkMenuFn = tagId => {//选中checked
        let { secletIds } = getParentIdAndName({//获取当前点击tag的自身和父亲的id集
            currentId: tagId,
            sampleTreeData: this.props.sampleMenuData,
        });
        let menuAlertCheckedKeys = [...new Set([...secletIds, ...this.state.menuAlertCheckedKeys])];//当前弹窗选中的所有id
        this.props.checkedParentFn && this.props.checkedParentFn(menuAlertCheckedKeys)
        this.setStateValueFn('menuAlertCheckedKeys',menuAlertCheckedKeys)
        return menuAlertCheckedKeys;
    }
    unCheckMenuFn = (menuAlertCheckedKeys,tagId) => {//未选中unchecked
        console.log('cancelCheck', tagId)
        let newMenuAlertCheckedKeys = deleteIdFromData([...menuAlertCheckedKeys], `${tagId}`)
        let children = this.props.sampleMenuData && this.props.sampleMenuData.get(tagId * 1).children
        if (!children || children.length === 0) {
            this.setStateValueFn('menuAlertCheckedKeys', newMenuAlertCheckedKeys)
            return this.props.checkedParentFn && this.props.checkedParentFn(newMenuAlertCheckedKeys)
        }
        let childrenIds = getChildrenIds(children);
        let checkedKeysNoChild = newMenuAlertCheckedKeys.filter(item => !childrenIds.includes(item))
        this.setStateValueFn('menuAlertCheckedKeys', checkedKeysNoChild)
        return this.props.checkedParentFn && this.props.checkedParentFn(checkedKeysNoChild)
    }
    checkedWorkFn = (checkedKeys) => {//select后要工作的内容
        let { sampleMenuData } = this.props;
        let leaf = filterLeafFn({ data: checkedKeys, sampleMenuData })
        let relationLeaf = relationLeafFn({ leaf, sampleMenuData })
        // console.log('c:',checkedKeys,leaf,relationLeaf)
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
        return data.map(item => {
            let { name, tagId, children } = item;
            let classNames;
            // debugger
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItem';
            }

            if (children && children.constructor.name === 'Array' && children.length) {
                return (
                    <div style={{ 'clear': 'both', 'overflow': 'hidden' }} key={tagId}>
                        <h2 title={name} key={tagId} id={tagId} style={{ 'clear': 'both', 'textAlign': 'left', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this, tagId)}>
                            <span className={classNames}>{name}</span>
                        </h2>
                        {this.renderNodesChildren(children)}
                    </div>
                )
            }
            return <h2 title={name} key={tagId} id={tagId} style={{ 'float': 'left', 'paddingRight': '20px', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this, tagId)}><span className={classNames}>{name}</span></h2>
        })
    }
    renderNodesChildren = (data = []) => { //渲染三级数据
        return data.map(item => {
            let { name, tagId, children } = item;
            let classNames;
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItem';
            }
            return (
                <div style={{ 'float': 'left', 'paddingRight': '20px' }} key={tagId}>
                    <h2 title={name} key={tagId} id={tagId} style={{ 'clear': 'both', 'textAlign': 'left', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this, tagId)}>
                        <span className={classNames}>{name}{123}</span>
                    </h2>
                    {
                        (children && children.constructor.name === 'Array' && children.length) ?
                            <ul style={{ 'float': 'left', 'paddingRight': '20px' }}>
                                {this.renderNodesChildren2(children)}
                            </ul> : null
                    }


                </div>
            )
        })
    }
    renderNodesChildren2 = (data = []) => {//渲染四级数据
        return data.map(item => {
            let { name, tagId } = item;
            let classNames;
            if (hasIdFromDataFn(this.state.menuAlertCheckedKeys, `${tagId}`)) {
                classNames = 'checkedMenuItem';
            }
            return (
                <li key={tagId} style={{ 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this, tagId)}>
                    <span className={classNames}>{name}{456}</span>
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
        let { menuAlertData } = this.props;
        return (
            <div className='menuAlert'>
                <Row>
                    <Col span={2} offset={22}><Icon type="close" onClick={this.alertCloseFn} /></Col>
                </Row>
                {menuAlertData ? this.renderNodes(menuAlertData) : null}
            </div>
        )
    }
}

export default MenuAlert