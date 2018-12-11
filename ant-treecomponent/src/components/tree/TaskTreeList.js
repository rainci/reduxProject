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
/**
 * 
 * @param {Array} data 
 * @return {Array}
 * @author rainci(刘雨熙)
 */
export const generateList = (() => {//将多层级的数据处理成单层级的数据方法
    let dealData = [];
    return function dealDataFn(data = []) {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            dealData.push(node);
            if (node.children && node.children.length) {
                dealDataFn(node.children);
            }
        }
        return dealData;
    }
})();

/**
* 
* @param {Array} data 
* @param {Number} id
* @return {Array}
* @author rainci(刘雨熙)
*/
export const filterOneData = (id, data) => { //筛选符合id的一条数据
    let arr = [];
    for (let o of data) {
        if (o.tagId === id) {
            arr.push({ ...o })
            break;
        }
    }
    return arr
}

class TaskTreeList extends React.Component {
    constructor(props) {
        super(props)
        let { checkedKeys = [], expandedKeys = [], treeData = [] } = props;
        this.state = {
            autoExpandParent: true, //是否自动展开
            checkedKeys: checkedKeys, //选择的keys
            expandedKeys: expandedKeys, //展开的keys
            treeData: treeData, //tree data
            sampleTreeData: generateList(treeData),//平级tree data            
        }
    }
    /***********公共方法 begin *****************/
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
     * @return {string[]} 
     */
    getParentsIds({ treeData = [], tier, depth = 0, currId }) {
        let ids = [];
        if (depth > tier || !treeData.length) return [];
        for (const item of treeData) {
            if (item.tagId === currId) {
                return [`${item.parentId}`]
            }
            const { children } = item;
            if (children && children.length) {
                const resault = this.getParentsIds({
                    treeData: children,
                    tier,
                    depth: depth + 1,
                    currId,
                })
                if (resault && resault.length) {
                    ids = [...resault];
                }
                if (item.parentId) {
                    ids.push(`${item.parentId}`);
                }
            }
        }
        return ids
    }

    checkItem({ draftCheckedKeys, parentId, pos, treeData }) {

        let checkedKeys = draftCheckedKeys;

        // 看当前更改的复选框是否有父级，无，则直接更新 checkedKeys
        if (parentId === undefined) {
            this.setState({
                checkedKeys
            })
            return;
        }

        /**
         * pos 是当前选择项的位置 string[]（string是0则未选中，string是1则选中）
         * 最后一位是当前项id
         */
        pos.pop();

        if (pos.length) {
            checkedKeys = [...checkedKeys, `${parentId}`];
        }

        const tier = pos.length; // 父级往上还有几层 （该数应该是 当前项距离顶层的层级减1）

        let parentsIds = [];
        if (tier > 0) {
            parentsIds = this.getParentsIds({
                treeData,
                tier: tier + 1, // 因为包括父级层在内，所以加1
                currId: `${parentId}`
            });
        }

        this.setState({
            checkedKeys: [...new Set([...parentsIds, ...checkedKeys, ...this.state.checkedKeys])]
        })
    }

    /**
     * 
     * @param {*} children 
     * @return {string[]} 
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

    unCheckItem({ draftCheckedKeys, children }) {
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

    /***********公共方法 end *****************/
    /***********页面业务逻辑 begin *****************/
    onTreeCheck = (checkedKeys, e) => {//当checkbox被点击时
        //ids存放被选中的checkbox的id及它父辈们的id；names存放被选中的checkbox的name和它父辈们的name

        const { node: { props }, checked: status } = e;
        const { parentId, pos, dataRef: { children } } = props;
        const changeInfo = {
            treeData: this.state.treeData,
            draftCheckedKeys: checkedKeys.checked,
            parentId,
            children,
            pos: pos.split('-'), // props.pos 位置 0-n 一级；0-n-n 二级
        }

        if (status) {
            this.checkItem(changeInfo);
        } else {
            this.unCheckItem(changeInfo);
        }
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
        const { checkedKeys, expandedKeys, autoExpandParent, treeData } = nextProps;
        this.setState({
            autoExpandParent,
            checkedKeys,
            expandedKeys,
            treeData,
            sampleTreeData: generateList(treeData),
        })
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