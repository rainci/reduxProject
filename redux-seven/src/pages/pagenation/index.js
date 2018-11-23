import React, { Component } from 'react';
import { Pagination } from 'antd';
import TreeDemo from '../tree'
import SelectTable from '../tree/selectTable'
function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

const Pagenations = () => {
    return(
        <div>
            <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
            <Pagination size="small" total={50} pageSize={6} />
            <Pagination size="small" total={50} showSizeChanger showQuickJumper />
            <TreeDemo />
            <SelectTable />
        </div>
    )
}
export default Pagenations;