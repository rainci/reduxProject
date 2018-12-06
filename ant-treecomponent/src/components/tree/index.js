/**
 * 
 * @param {Array} 必选 treeData 
 * @param {Array} 可选 checkedKeys 
 * @param {Array} 可选 expandedKeys
 * @param {Function} 必选 onTreeCheck(arg1,arg2) 参数1{Array} 选中的id，参数2{Array} 选中的name
 * @return {component} TaskTagTreeList 
 * @author rainci(刘雨熙)
 * @attention 当可选参数作为属性传入后，则展示相对应数据的控制权交到此组件的父组件上，
 * onTreeCheck回调中，要把父组件对应传入此组件的数据也要相应更新。 
 */
import React from 'react'
import UserSearch from './userSearch'
import TaskTreeList from './TaskTreeList'

const searchTagNames = [
    { 'name': 'tag', 'value': 'name', 'num': 20 },
];
/**
 * 
 * @param {Array} data 
 * @return {Array}
 * @author rainci(刘雨熙)
 */
export const generateList = (()=>{//将多层级的数据处理成单层级的数据方法
    let dealData = [];
    return function dealDataFn(data=[]) {
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

class TaskTagTreeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autoExpandParent: true,
            checkedKeys: [],
            expandedKeys: [],
            treeData: []

        }
    }
    /***********公共方法 begin *****************/
    
    /***********公共方法 end *****************/
    /***********页面业务逻辑 begin *****************/
    treeCheckedFn = (checkedKeys,checkedNames) => {//当checkbox被点击时
        this.setState({
            checkedKeys,
            expandedKeys: checkedKeys.length ? checkedKeys : this.state.expandedKeys   
        }) 
        this.props.onTreeCheck(checkedKeys,checkedNames)       
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
        this.setState({
            expandedKeys,

        });
    }
    /***********页面业务逻辑 end *****************/
    /***********生命周期 begin **************/
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const { checkedKeys, expandedKeys, treeData } = nextProps;
        this.setState({
            treeData,
            sampleTreeData: generateList(treeData),
        })
        if(checkedKeys){
            this.setState({
                checkedKeys 
            })    
        }
        if(expandedKeys){
            this.setState({
                expandedKeys 
            })  
        }
    }
    /***********生命周期 end **************/
    render() {
        const { autoExpandParent, checkedKeys, expandedKeys, treeData } = this.state;
        return (
            <div>
                <UserSearch searchNames={searchTagNames} onSearchFn={this.searchTagFn} />
                <TaskTreeList
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    autoExpandParent={autoExpandParent}
                    expandedKeys={expandedKeys}
                    onTreeCheck={this.treeCheckedFn}
                />
            </div>
        )
    }
}
export default TaskTagTreeList;