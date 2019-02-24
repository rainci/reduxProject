import React, { Component } from 'react';
import server from '../api/server';
import {message} from 'antd';
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
      return status == true ? "启用" : "禁用"
    }
  },
];

class TableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableListData: [],
      selectedRowKeys: []
    }
  }
  /***********公共方法 begin *****************/
  setStateValue = (key, value) => {//为state设置value
    this.setState({
      [key]: value
    })
  }
  getTableListData = () => {//获取tablelist data
    return server.getTableList().then((db) => {
      const { code, data = [] } = db;
      if (code === 200 || code === '200') {
       return data
      } else {
        message.error(db.msg)
      }
    })
  }
  /***********公共方法 end*****************/
  tableListCheckFn = (rowkeys, rows) => {
    // console.log('tableListCheck:', rowkeys, rows)
  }
  getTableDataFn = () => {
    this.getTableListData()
    .then(db => {
      console.log(11111111,db)
      this.setStateValue('tableListData',db)
    })
  }
  componentDidMount() {
    this.getTableDataFn()//talelist get data
    this.setState({
      selectedRowKeys: [0]
    })
  }
  render() {
    return (
      <div>
        <TableListCheck
          columnsTable={columnsTable}
          tableListData={this.state.tableListData}
          selectedRowKeys={this.state.selectedRowKeys}
          onTableListCheck={this.tableListCheckFn}
        />
      </div>
    );
  }
}

export default TableList;