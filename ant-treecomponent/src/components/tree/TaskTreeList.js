/**
 * 
 * @param {Array} treeData 
 * @param {Array} checkedKeys
 * @param {Array}  expandedKeys
 * @param {boolean} autoExpandParent 
 * @param {Function} onTreeCheck  
 * @return {component} TaskTreeList 
 * @author rainci(刘雨熙)
 */

import React from 'react';
import { Tree } from 'antd';
import shallowEqual from 'shallowequal';
const TreeNode = Tree.TreeNode;

class TaskTreeList extends React.Component {
    constructor(props) {
        super(props)
        let { checkedKeys = [], expandedKeys = [], treeData = [], sampleTreeData = [] } = props;
        this.state = {
            autoExpandParent: true, //是否自动展开
            checkedKeys: checkedKeys, //选择的keys
            expandedKeys: expandedKeys, //展开的keys
            treeData: treeData, //tree data
            sampleTreeData: sampleTreeData,//平级tree data   
            allSelectData: []
        }
    }
    /***********公共方法 begin *****************/
    /**
     * 
     * @param {Array} data 
     * @return {string[]} 
     * @author rainci(刘雨熙)
     * 渲染treeNode
     */
    renderTreeNodes = data => { //渲染treeNode
        return data.map(item => {
            let { name, tagId, children, parentId } = item;
            if (children && children.length) {
                return (
                    <TreeNode title={name} key={tagId} dataRef={item} id={tagId} parentId={parentId} >
                        {this.renderTreeNodes(children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={name} key={tagId} dataRef={item} id={tagId} parentId={parentId} />
        })
    }
    /**
    * 
    * @param {Array} data 
    * @param {Number} id
    * @return {Array}
    * @author rainci(刘雨熙)
    */
    filterOneData = (id, data) => { //筛选符合id的一条数据
        return data.get(id)
    }
    /**
     * 
     * @param {Number} currentId 
     * @param {Array} sampleTreeData 
     * @param {Array} secletIds 可选
     * @param {Array} secletIdsAndNames 可选
     * @return {{secletIds,relationLeaf}} 
     * @author rainci(刘雨熙)
     * 获取父辈们的id和name
     */
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
    /**
     * 
     * @param {Array} children 
     * @return {string[]} 
     * @author rainci(刘雨熙)
     * get children的ids
     */
    getChildrenIds(children = []) {
        let ids = [];
        for (const child of children) {
            const { tagId } = child;
            if (tagId) {
                ids.push(`${tagId}`);
            }
            if (child.children) {
                const resault = this.getChildrenIds(child.children);
                if (resault && resault.length) {
                    ids.push(...resault);
                }
            }
        }
        return ids;
    }
    /**
     * 
     * @param {Array} data 
     * @param {Array[{}]} itemChildren 
     * @return {Boolean} 
     * @author rainci(刘雨熙)
     * 检测data数组里的值是否有itemChildren数组里的孩子的id
     */
    checkHasChildren = (data, itemChildren) => {
        for (const { tagId } of itemChildren) {
            if (data.includes(`${tagId}`)) {
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @param {Array} data 
     * @return {Boolean} 
     * @author rainci(刘雨熙)
     * 筛选data(tree data)，把data中的子节点和子节点没有在data中的父节点返回
     */
    filterLeaf = data => { //筛选select后的叶子节点
        return data.filter(item => {
            let itemChildren = this.state.sampleTreeData.get(parseInt(item)).children;
            if (itemChildren && itemChildren.length && this.checkHasChildren(data, itemChildren)) {
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
                sampleTreeData: this.state.sampleTreeData,
            }).relationLeaf
        })
    }
    /***********公共方法 end *****************/
    /***********页面业务逻辑 begin *****************/
    checkItem({ draftCheckedKeys, parentId, sampleTreeData }) { //选择select时
        let checkedKeys = draftCheckedKeys;
        // 看当前更改的复选框是否有父级，无，则直接更新 checkedKeys
        if (parentId === 0 || parentId === undefined) {
            this.setState({
                checkedKeys
            })
            return;
        }
        let parentsIds = this.getParentIdAndName({
            currentId: parentId,
            sampleTreeData,
        }).secletIds;
        this.setState({
            checkedKeys: [...new Set([...parentsIds, ...checkedKeys, ...this.state.checkedKeys])],
        })
    }
    unCheckItem({ draftCheckedKeys, children }) {//取消select时
        let checkedKeys = draftCheckedKeys;
        if (!children || children.length < 0) {
            this.setState({
                checkedKeys
            })
            return;
        }
        let childrenIds = this.getChildrenIds(children);
        this.setState({
            checkedKeys: checkedKeys.filter(item => !childrenIds.includes(item))
        })
    }
    checkedWork = (checkedKeys) => {//select后要工作的内容
        let leaf = this.filterLeaf(checkedKeys)
        let relationLeaf = this.relationLeafFn(leaf)
        this.props.onTreeCheck && this.props.onTreeCheck(checkedKeys, relationLeaf)
    }
    onTreeCheck = (checkedKeys, e) => {//当checkbox被点击时
        //ids存放被选中的checkbox的id及它父辈们的id；names存放被选中的checkbox的name和它父辈们的name
        const { node: { props }, checked: status } = e;
        const { parentId, dataRef: { children } } = props;
        const changeInfo = {
            sampleTreeData: this.state.sampleTreeData,
            draftCheckedKeys: checkedKeys.checked,
            parentId,
            children
        };
        if (status) {
            this.checkItem(changeInfo);
        } else {
            this.unCheckItem(changeInfo);
        }
        setTimeout(() => {
            const { checkedKeys } = this.state;
            this.checkedWork(checkedKeys);
        }, 10)
    }

    onExpand = (expandedKeys) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeys, expandedKeys, autoExpandParent, treeData, sampleTreeData } = nextProps;
        this.setState({
            autoExpandParent,
            checkedKeys,
            expandedKeys,
            treeData,
            sampleTreeData,
        })
        this.checkedWork(checkedKeys);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState);

    }
    /***********生命周期 end **************/
    render() {
        let { autoExpandParent, checkedKeys, expandedKeys, treeData } = this.state;

        return (
            <div>
                <Tree
                    checkable={true}
                    checkStrictly={true}
                    autoExpandParent={autoExpandParent}
                    onCheck={this.onTreeCheck}
                    checkedKeys={{
                        checked: checkedKeys
                    }}
                    expandedKeys={expandedKeys}
                    onExpand={this.onExpand}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
            </div>
        )
    }
}
export default TaskTreeList;