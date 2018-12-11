import React, { Component } from 'react';
import TableListCheck from '../components/table/tableListCheck';
const columnsTable = [
    {
        title: '帐号',
        dataIndex: 'username',
        key: 'username',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => {
            return status == "enabled" ? "启用" : "禁用"
        }
    },
];
  const tableListData = [
    {
      'username': 'lyx',
      'phone': 15100000001,
      'email': '123456@qq.com',
      'status': '已完成',
      'id': 0 
    },
    {
      'username': 'lyx2',
      'phone': 15100000001,
      'email': '12345678@qq.com',
      'status': '未完成',
      'id': 1
    },
    {
      'username': 'lyx3',
      'phone': 15100000001,
      'email': '12345678@qq.com',
      'status': '未完成',
      'id': 2
    },
  ];
  
  class TableList extends Component {
    constructor(props){
      super(props)
      this.state = {
        selectedRowKeys:[]
      }
    }
    tableListCheck = (rowkeys,rows) => {
      console.log('tableListCheck:',rowkeys,rows)
    }
    componentDidMount(){
      this.setState({
        selectedRowKeys: [0]
      })  
    }
    render() {
      return (
        <div>
          <TableListCheck 
            columnsTable={columnsTable}
            tableListData={tableListData}
            selectedRowKeys={this.state.selectedRowKeys}
            onTableListCheck={this.tableListCheck}
          />
        </div>
      );
    }
  }
  
  export default TableList;