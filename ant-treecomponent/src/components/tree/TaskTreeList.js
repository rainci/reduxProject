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
    let dealData = new Map();
    return function dealDataFn(data = []) {
        for (let i = 0; i < data.length; i++) {
            const node = data[i],
                tagId = node.tagId;
            dealData.set(tagId,node);
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
    return data.get(id)
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
            allSelectData:[]         
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
    getParentIdAndName = ({currentId,sampleTreeData,secletIds}) => {//获取父辈们的id和name
        let parentItem = filterOneData(currentId, sampleTreeData);
        let { name, tagId, parentId } = parentItem;
        let arr = [];
        secletIds.unshift(`${tagId}`)
        arr.unshift({tagId,name})
        if( parentId ){
            let result = this.getParentIdAndName({ currentId:parentId, sampleTreeData, secletIds})
            arr = [...arr,...result]
        }
        return arr;
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


    checkItem({ draftCheckedKeys, parentId, tagId, name, sampleTreeData }) {
        let parentsIds = [], arr = [], allSelectData=[];
        let checkedKeys = draftCheckedKeys;
        arr.push({tagId,name})
        // 看当前更改的复选框是否有父级，无，则直接更新 checkedKeys
        if (parentId === 0 || parentId === undefined) {
            this.setState({
                checkedKeys
            })
            return;
        }

        arr =[...arr,...this.getParentIdAndName({
            currentId: parentId,
            secletIds: parentsIds,
            sampleTreeData,
        })]; 
        allSelectData.push(arr)
        this.setState({
            checkedKeys: [...new Set([...parentsIds, ...checkedKeys, ...this.state.checkedKeys])],
            allSelectData:[...this.state.allSelectData,...allSelectData]
        })
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
        console.log('ontreeCheck:',checkedKeys,e)
        const { node: { props }, checked: status } = e;
        const { parentId, pos, dataRef: { children, tagId, name } } = props;
        const {treeData, sampleTreeData} = this.state
        const changeInfo = {
            treeData,
            sampleTreeData,
            draftCheckedKeys: checkedKeys.checked,
            tagId,
            name,
            parentId,
            children
        }

        if (status) {
            this.checkItem(changeInfo);
        } else {
            this.unCheckItem(changeInfo);
        }
        setTimeout(()=>{
            this.props.onTreeCheck && this.props.onTreeCheck(this.state.checkedKeys,this.state.allSelectData)
        },100)
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