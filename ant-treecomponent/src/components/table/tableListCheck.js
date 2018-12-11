/**
 * 
 * @param {Array} tableListData 数据源 
 * @param {Array} columnsTable 表头 
 * @param {Array} selectedRowKeys 选中的key
 * @param {Function} onTableListCheck 回调  
 * @return {component} TableListCheck 
 * @author rainci(刘雨熙)
 */

/* eslint-disable  */
import React from "react";
import { Table} from 'antd'; 
import shallowEqual from 'shallowequal';
class TableListCheck extends React.Component{
    constructor(props){
        super(props)
        let {selectedRowKeys = [], columnsTable = [], tableListData = [], scrollY = 448} = props;
        this.state = {
            selectedRowKeys, //选中的keys
            columnsTable,
            tableListData,
            scrollY
        };
    }
    
    onSelectChange = (selectedRowKeys,selectedRows) => { //select更改时
        this.props.onTableListCheck && this.props.onTableListCheck(selectedRowKeys,selectedRows)
        this.setState({ selectedRowKeys });
    }
    /***********生命周期 begin **************/
    componentWillReceiveProps(nextProps) {
        const { selectedRowKeys, tableListData } = nextProps;
        this.setState({
            selectedRowKeys,
            tableListData
        })
    }
    shouldComponentUpdate(nextProps,nextState){
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState);

    }
    /***********生命周期 end **************/
    render(){
        console.log('table:',this.props,this.state)
        const { selectedRowKeys, tableListData , columnsTable, scrollY } = this.state;
        // selectedRowKeys=selectedRowKeys.map((v,i)=>{return parseInt(v)});
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
                <Table 
                    columns={columnsTable}
                    dataSource={tableListData} 
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    size={"small"}
                    pagination = {false}
                    scroll={{ y: scrollY }}
                    // pagination={{  //分页
                    //     total: userListPage, //数据总数量
                    //     defaultPageSize: 10, //默认显示几条一页
                    //     onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                    //         console.log(current, pageSize)
                    //     },
                    //     onChange:this.onPaginationChange,                                 
                    //     showTotal: function () {  //设置显示一共几条数据
                    //         return '共 ' + this.total + ' 条数据'; 
                    //     }
                    // }}
                /> 
        )
    }
}

export default TableListCheck;