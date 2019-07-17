import React, { Component } from 'react';
import server from '../api/server';
import {message, Table} from 'antd';
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
const columnsTable2 = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
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
        <Table
          columns={columnsTable2}
          dataSource={data} 
          rowKey={record => record.key}
        />
      </div>
    );
  }
}

export default TableList;