/**
 * 
 * @param {Array} 必选 treeData 
 * @param {Array} 可选 checkedKeys 
 * @param {Array} 可选 expandedKeys
 * @param {Number} 可选 treeHeight
 * @param {Function} 必选 onTreeCheck({checkedKeys,expandedKeys,relationLeaf,checkedTagList}) 
 * @return {component} TaskTagTreeList 
 * @author rainci(刘雨熙)
 * @attention 当可选参数作为属性传入后，则展示相对应数据的控制权交到此组件的父组件上，
 * onTreeCheck回调中，要把父组件对应传入此组件的数据也要相应更新。 
 */
import React from 'react'
import UserSearch from './userSearch'
import TaskTreeList from './TaskTreeList'
import shallowEqual from 'shallowequal'

const searchTagNames = [
    { 'name': 'tag', 'value': 'name', 'num': 20 },
];
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
            dealData.set(tagId, node);
            if (node.children && node.children.length) {
                dealDataFn(node.children);
            }
        }
        return dealData;
    }
})();

class TaskTagTreeList extends React.Component {
    constructor(props) {
        super(props)
        let { checkedKeys = [], expandedKeys = [], treeData = [], initKeys=false } = props;
        this.state = {
            autoExpandParent: true,//自动展开
            checkedKeys,//选中的keys
            expandedKeys,//展开的keys
            initKeys, //是否要初始化tree内部的数据
            treeData,//数据源
            searchValue: '',
            sampleTreeData: generateList(treeData)//数据源转换成单层数据

        }
    }
    /***********页面业务逻辑 begin *****************/
    treeCheckedFn = ({checkedKeys,relationLeaf}) => {//当checkbox被点击时
        let checkedTagList = this.getCheckedTagListFn(checkedKeys);
        this.props.onTreeCheck({checkedKeys, relationLeaf, checkedTagList})

    }
    getCheckedTagListFn = checkedKeys => {//将选中的数组id转换成平级的有id和name的对象集数组
        const { sampleTreeData } = this.state;
        return [...checkedKeys].map(i => {
            if( sampleTreeData.get(Number(i))){
                return { tagId: i, name: this.state.sampleTreeData.get(Number(i)).name }
            } 
            return {}
        })
    }
    searchTagFn = filter => {//搜索tag
        const { sampleTreeData } = this.state;
        const value = filter.name,
            expandedKeys = [];
        sampleTreeData.forEach(item => {
            if (item.name.indexOf(value) > -1) {
                expandedKeys.push(item.tagId.toString());
            }
        });
        // let searchExpandKeys = [...new Set([...(this.props.expandedKeys?this.props.expandedKeys:[]),...expandedKeys])]
        this.setState({
            expandedKeys,
            searchValue: value,
        });
    }
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { checkedKeys, expandedKeys, initKeys=false, treeData } = nextProps;
        this.setState({
            treeData,
            sampleTreeData: generateList(treeData),
            checkedKeys: checkedKeys || this.state.checkedKeys,
            expandedKeys: expandedKeys || this.state.expandedKeys,
            initKeys
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState);

    }
    /***********生命周期 end **************/
    render() {
        const { autoExpandParent, checkedKeys, expandedKeys, treeData, sampleTreeData, initKeys, searchValue } = this.state;

        return (
            <div>
                <UserSearch searchNames={searchTagNames} onSearchFn={this.searchTagFn} onInputBlurFn={this.inputBlurFn} />
                <TaskTreeList
                    treeData={treeData}
                    treeHeight={this.props.treeHeight}
                    sampleTreeData={sampleTreeData}
                    checkedKeys={checkedKeys}
                    autoExpandParent={autoExpandParent}
                    expandedKeys={expandedKeys}
                    initKeys={initKeys}
                    searchValue={searchValue}
                    onTreeCheck={this.treeCheckedFn}

                />
            </div>
        )
    }
}
export default TaskTagTreeList;