import React, { Component } from 'react';
import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

const Pagenation = () => {
    return(
        <div>
            <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
            <Pagination size="small" total={50} pageSize={6} />
            <Pagination size="small" total={50} showSizeChanger showQuickJumper />
        </div>
    )
}
export default Pagenation;