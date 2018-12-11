import React, { Component } from 'react';
import './App.css';
import RouteMap from './routers'
//   const treeDatas = [
//     {
//       name: '顶部',
//       tagId:1,
//       parentId:0,
//       children: [
//         {
//           name: '人物',
//           tagId:11,
//           parentId:1,
//           children: [
//             {
//               name: '奥巴马',
//               tagId:111,
//               parentId:11,
//             },
//             {
//               name: '特朗普',
//               tagId:112,
//               parentId:11,
//             }  
//           ]
//         },
//         {
//           name: '动物',
//           tagId:12,
//           parentId:1,
//           children: [
//             {
//               name: '老虎',
//               tagId:121,
//               parentId:12,
//             },
//             {
//               name: '狮子',
//               tagId:122,
//               parentId:12,
//             }  
//           ]
//         }
//       ]
//     }
//   ];
//   const columnsTable = [
//     {
//         title: '帐号',
//         dataIndex: 'username',
//         key: 'username',
//         render: text => <a href="javascript:;">{text}</a>,
//     }, {
//         title: '手机号',
//         dataIndex: 'phone',
//         key: 'phone',
//     }, {
//         title: '邮箱',
//         dataIndex: 'email',
//         key: 'email',
//     },
//     {
//         title: '状态',
//         key: 'status',
//         dataIndex: 'status',
//         render: status => {
//             return status == "enabled" ? "启用" : "禁用"
//         }
//     },
// ];
//   const tableListData = [
//     {
//       'username': 'lyx',
//       'phone': 15100000001,
//       'email': '123456@qq.com',
//       'status': '已完成',
//       'id': 0 
//     },
//     {
//       'username': 'lyx2',
//       'phone': 15100000001,
//       'email': '12345678@qq.com',
//       'status': '未完成',
//       'id': 1
//     },
//     {
//       'username': 'lyx3',
//       'phone': 15100000001,
//       'email': '12345678@qq.com',
//       'status': '未完成',
//       'id': 2
//     },
//   ] 
// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       treeData: [],
//       checkedKeys: ['1', '11'],
//       expandedKeys: ['1','11'] 
//     }
//   }
//   treeCheckFn = (checkedKeys,names) => {
//     console.log(checkedKeys,names) 
//   //   this.setState({
//   //     checkedKeys,
//   //     expandedKeys: checkedKeys.length ? checkedKeys : this.state.expandedKeys   
//   // })  
//   }
//   tableListCheck = (rowkeys,rows) => {
//     console.log('tableListCheck:',rowkeys,rows)
//   }
//   componentDidMount(){
//     this.setState({
//       treeData: treeDatas,
//       expandedKeys: ['1','11']  
//     })
//   }
//   render() {
//     let { expandedKeys, checkedKeys, treeData } =this.state;
//     return (
//       <div className="App">
//         <TaskTagTreeList 
//           treeData={treeData} 
//           onTreeCheck={this.treeCheckFn}
//           checkedKeys={checkedKeys} 
//           expandedKeys={expandedKeys} 
//         />
//         {/* <TableListCheck 
//           columnsTable={columnsTable}
//           tableListData={tableListData}
//           selectedRowKeys={[0]}
//           onTableListCheck={this.tableListCheck}
//         /> */}
//       </div>
//     );
//   }
// }
class App extends Component {
  render() {
    return (
      <div className="App">
        <RouteMap />
      </div>
    );
  }
}

export default App;
