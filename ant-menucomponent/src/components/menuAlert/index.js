import React, { PureComponent } from 'react';
import { Icon, Row, Col } from 'antd';

import './index.css'
class MenuAlert extends PureComponent {
    state = {
        menuCheckedKeys: [],        
    }
    filterOneData = (id, data) => { //筛选符合id的一条数据
        return data && data.get(id)
    }
    getParentIdAndName = ({ currentId, sampleTreeData, secletIds = [], relationLeaf = [] }) => {//获取父辈们的id和name
        let parentItem = this.filterOneData(currentId, sampleTreeData);
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
    memuClickFn = tagId => {// menu click
        let { menuCheckedKeys } = this.state;
        let status = this.checkHasClickId(menuCheckedKeys,tagId);
        if (status) {//当前选中状态，则取消选中
            this.unCheckMenu(tagId);
            let newCheckMenuData = [...menuCheckedKeys]
            newCheckMenuData.splice(newCheckMenuData.indexOf(tagId),1)
            this.setState({
                menuCheckedKeys: newCheckMenuData,   
            })
        } else {//当前未选中状态，则选中
            this.checkMenu(tagId);
            // menuCheckedKeys.push(tagId)
        }
        this.props.memuClickFn && this.props.memuClickFn(tagId)
    }
    checkHasClickId = (data, tagId) => {//判断是否选中此tag
        if (data.includes(tagId)) {
            return true;
        }
        return false;
    }
    checkMenu = tagId => {
        // debugger
        console.log('check')
        let {secletIds, relationLeaf} = this.getParentIdAndName({
            currentId: tagId,
            sampleTreeData: this.props.sampleMenuData,
        });
        this.setState({
            menuCheckedKeys: [...new Set([...secletIds, ...this.state.menuCheckedKeys])],    
        })
        setTimeout(()=> {
            console.log('checked:', secletIds,this.state.menuCheckedKeys,relationLeaf)
        },100)
    }
    unCheckMenu = tagId => {
        console.log('cancelCheck',tagId)
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

            if (children && children.constructor.name === 'Array' && children.length) {
                return (
                    <div style={{'clear':'both','overflow':'hidden'}} key={tagId}>
                        <h2 title={name} key={tagId} id={tagId} style={{ 'clear': 'both', 'textAlign': 'left', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this,tagId)}>
                            {name}
                        </h2>
                        {this.renderNodesChildren(children)}
                    </div>
                )
            }
            return <h2 title={name} key={tagId} id={tagId} style={{ 'float': 'left', 'paddingRight': '20px', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this,tagId)}>{name}</h2>
        })
    }
    renderNodesChildren = (data = []) => {
        return data.map(item => {
            let { name, tagId, children } = item;

            if (children && children.constructor.name === 'Array' && children.length) {
                return (
                    <div style={{ 'float': 'left', 'paddingRight': '20px' }} key={tagId}>
                        <h2 title={name} key={tagId} id={tagId} style={{ 'clear': 'both', 'textAlign': 'left', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this,tagId)}>
                            {name}{123}
                        </h2>
                        <ul style={{ 'float': 'left', 'paddingRight': '20px' }} key={tagId}>
                            {this.renderNodesChildren2(children)}
                        </ul>
                    </div>
                )
            }
            return (
                <div style={{ 'float': 'left', 'paddingRight': '20px' }} key={tagId}>
                    <h2 title={name} key={tagId} id={tagId} style={{ 'clear': 'both', 'textAlign': 'left', 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this,tagId)}>
                        {name}{123}
                    </h2>
                    {/* {this.renderNodes(children)} */}
                </div>
            )
        })
    }
    renderNodesChildren2 = (data = []) => {
        return data.map(item => {
            let { name, tagId } = item;
            return (
                <li  key={tagId} style={{ 'cursor': 'pointer' }} onClick={this.memuClickFn.bind(this,tagId)}>
                   {name}{456}
                </li>
            )
        })
    }
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeys = [] } = nextProps;
        if( checkedKeys && checkedKeys.length){
            this.setState({
                checkedKeys
            })
        }
        
        // this.checkedWork(checkedKeys);
    }
    /***********生命周期 end **************/
    render() {
        let { menuAlertData } = this.props;
        console.log('menuAlertData:', menuAlertData)
        return (
            <div className='menuAlert'>
                <Row>
                    <Col span={2} offset={22}><Icon type="close" onClick={this.alertCloseFn} /></Col>
                </Row>
                {this.renderNodes(menuAlertData)}
            </div>
        )
    }
}

export default MenuAlert