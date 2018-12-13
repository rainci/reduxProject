import React, { Component } from 'react';
import TaskTagTreeList from '../components/tree/index';
const treeDatas = [
    {
      name: '顶部',
      tagId:1,
      parentId:0,
      children: [
        {
          name: '人物',
          tagId:11,
          parentId:1,
          children: [
            {
              name: '奥巴马',
              tagId:111,
              parentId:11,
            },
            {
              name: '特朗普',
              tagId:112,
              parentId:11,
            }  
          ]
        },
        {
          name: '动物',
          tagId:12,
          parentId:1,
          children: [
            {
              name: '老虎',
              tagId:121,
              parentId:12,
            },
            {
              name: '狮子',
              tagId:122,
              parentId:12,
            }  
          ]
        }
      ]
    }
  ];
  class TagTree extends Component {
    constructor(props){
      super(props)
      this.state = {
        treeData: [],
        checkedKeys: [],
        expandedKeys: [] 
      }
    }
    treeCheckFn = (checkedKeys,names) => {
      console.log('outercheckd:',checkedKeys,names) 
    }
    componentDidMount(){
      this.setState({
        treeData: treeDatas,
        expandedKeys: ['1','11'],
        checkedKeys: ['1', '11','12'],  
      })
    }
    render() {
      let { expandedKeys, checkedKeys, treeData } =this.state;
      return (
        <div >
          <TaskTagTreeList 
            treeData={treeData} 
            onTreeCheck={this.treeCheckFn}
            checkedKeys={checkedKeys} 
            expandedKeys={expandedKeys} 
          />
        </div>
      );
    }
  }
  
  export default TagTree;
  