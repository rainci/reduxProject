/**
 * 
 * @param {Array} treeData 
 * @param {Array} checkedKeys
 * @param {Array}  expandedKeys
 * @param {Number} 可选 treeHeight
 * @param {boolean} autoExpandParent 
 * @param {Function(Array)} checkedParentFn  把选中过的弹框的父id集传出去  
 * @return {component} TaskTreeList 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 */
import React, { PureComponent } from 'react';
import { Icon, Row, Col } from 'antd';
import {filterOneData, hasIdFromDataFn} from '../../utils'
import './index.less'
class MenuAlert extends PureComponent {
    state = {
        menuCheckedKeys: [],//弹框选中的id
    }
    /**
     * 
     * @param {Array} sampleTreeData 必选 
     * @param {Number} currentId 必选
     * @param {Array} secletIds 可选
     * @param {Array} relationLeaf 可选
     * @return {Object} {secletIds,relationLeaf}
     * @author rainci(刘雨熙)
     * @attention 筛选data(平级tree data)，把data中对应的id的值返回
     */
    getParentIdAndName = ({ currentId, sampleTreeData, secletIds = [], relationLeaf = [] }) => {//获取父辈们的id和name
        let parentItem = filterOneData(sampleTreeData, currentId);
        if (parentItem && Object.keys(parentItem).length) {
            let { tagId, name, parentId } = parentItem;
            secletIds.unshift(`${tagId}`)
            relationLeaf.unshift({ tagId, name })
            if (parentId) {
                this.getParentIdAndName({ currentId: parentId, sampleTreeData, secletIds, relationLeaf })
            }
        }
        return {
            secletIds,
            relationLeaf
        }

    }
    alertCloseFn = () => {//close alert fn
        this.props.closeFn && this.props.closeFn()
    }
    /**
     * 
     * @param {Array} data 必选 
     * @return {Boolean} 
     * @author rainci(刘雨熙)
     * 筛选data(tree data)，把data中的子节点和子节点没有在data中的父节点返回
     */
    filterLeafFn = data => { //筛选select后的叶子节点
        const { sampleMenuData } = this.props;
        return data.filter(item => {
            let itemChildren = sampleMenuData && sampleMenuData.size && sampleMenuData.get(parseInt(item)) && sampleMenuData.get(parseInt(item)).children;
            if (itemChildren && itemChildren.length && this.checkHasChildrenFn(data, itemChildren)) {
                return false;
            } else {
                return true;
            }
        })
    }
    /**
     * 
     * @param {Array} leaf 
     * @return {Array[[]]}
     * @author rainci(刘雨熙)
     * 将子节点返回有父辈关系的二维数组
     */
    relationLeafFn = leaf => { //将叶子节点转换成对应关系的父辈和叶子
        return leaf.map(item => {
            return this.getParentIdAndName({
                currentId: Number(item),
                sampleTreeData: this.props.sampleMenuData,
            }).relationLeaf
        })
    }
    checkedWorkFn = (checkedKeys) => {//select后要工作的内容
        let leaf = this.filterLeafFn(checkedKeys)
        let relationLeaf = this.relationLeafFn(leaf)
        // console.log('c:',checkedKeys,leaf,relationLeaf)
        this.props.memuCheckedFn && this.props.memuCheckedFn({ checkedKeys, relationLeaf })

    }
    memuClickFn = tagId => {// menu tag click fn
        let { menuCheckedKeys } = this.state;
        let status = hasIdFromDataFn(menuCheckedKeys, tagId);//是否是选中状态true or false
        if (status) {//当前选中状态，则取消选中
            // this.unCheckMenuFn(tagId);
            // let newCheckMenuData = [...menuCheckedKeys]
            // newCheckMenuData.splice(newCheckMenuData.indexOf(tagId), 1)
            // this.setState({
            //     menuCheckedKeys: newCheckMenuData,
            // })
        } else {//当前未选中状态，则选中
            this.checkMenuFn(tagId);
        }
        setTimeout(() => {
            const { menuCheckedKeys } = this.state;
            this.checkedWorkFn(menuCheckedKeys);
        }, 10)
        // this.props.memuClickFn && this.props.memuClickFn(tagId)
    }
    /**
     * 
     * @param {Array} data 
     * @param {Array[{}]} itemChildren 
     * @return {Boolean} 
     * @author rainci(刘雨熙)
     * 检测data数组里的值是否有itemChildren数组里的孩子的id
     */
    checkHasChildrenFn = (data, itemChildren) => {
        for (const { tagId } of itemChildren) {
            if (data.includes(`${tagId}`)) {
                return true;
            }
        }
        return false;
    }

    checkMenuFn = tagId => {//选中checked
        console.log('check')
        let { secletIds } = this.getParentIdAndName({//获取当前点击tag的自身和父亲的id集
            currentId: tagId,
            sampleTreeData: this.props.sampleMenuData,
        });
        let menuCheckedKeys = [...new Set([...secletIds, ...this.state.menuCheckedKeys])];//当前弹窗选中的所有id
        console.log('checked:', secletIds, menuCheckedKeys)
        let currentParentId = secletIds[0];//当前弹框的父id  
        if(this.checkedParentData){//当checkedParentData存在时
            if(!hasIdFromDataFn(this.checkedParentData,currentParentId)){//当this.checkedParentData里没有此父id时
                this.checkedParentData.push(currentParentId)
                this.props.checkedParentFn && this.props.checkedParentFn(this.checkedParentData) 
                console.log('wawo1',this.checkedParentData)   
            }
        }else{
            this.checkedParentData=[currentParentId]
            this.props.checkedParentFn && this.props.checkedParentFn(this.checkedParentData) 
            console.log('wawo2',this.checkedParentData)   
        }
        this.setState({
            menuCheckedKeys,
        })
        return menuCheckedKeys;
    }
    unCheckMenuFn = tagId => {//未选中unchecked
        console.log('cancelCheck', tagId)
    }
    /**
     * 
     * @param {Array} data 
     * @return {string[]} 
     * @author rainci(刘雨熙)
     * 渲染treeNode
     */
    renderNodes = (data = []) => { //渲染treeNode
        return data.map(item => {
            let { name, tagId, children } = item;
            let classNames;
            if(hasIdFromDataFn(this.state.menuCheckedKeys,`${tagId}`)){
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
    renderNodesChildren = (data = []) => {
        return data.map(item => {
            let { name, tagId, children } = item;
            let classNames;
            if(hasIdFromDataFn(this.state.menuCheckedKeys,`${tagId}`)){
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
    renderNodesChildren2 = (data = []) => {
        return data.map(item => {
            let { name, tagId } = item;
            let classNames;
            if(hasIdFromDataFn(this.state.menuCheckedKeys,`${tagId}`)){
                classNames = 'checkedMenuItem';    
            }
            return (
                <li key={tagId} style={{ 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this, tagId)}>
                    <span className={classNames}>{name}{456}</span>
                </li>
            )
        })
    }
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeys = [] } = nextProps;
        if (checkedKeys && checkedKeys.length) {
            this.setState({
                menuCheckedKeys: checkedKeys
            })
        }

        // this.checkedWork(checkedKeys);
    }
    /***********生命周期 end **************/
    render() {
        console.log('menuAlertData:', this.props)
        return (
            <div className='menuAlert'>
                <Row>
                    <Col span={2} offset={22}><Icon type="close" onClick={this.alertCloseFn} /></Col>
                </Row>
                {this.props.menuAlertData ? this.renderNodes(this.props.menuAlertData):null}
            </div>
        )
    }
}

export default MenuAlert