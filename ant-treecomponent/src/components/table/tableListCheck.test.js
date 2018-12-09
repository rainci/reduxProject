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
import Aaa from './aaa'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


let wrapper;


beforeEach(() => {
    wrapper = mount(<Aaa />);
})







describe('components', () => {
    describe('TableListCheck', () => {
      it('should render self and subcomponents', () => {
        const { wrapper } = setup();
  ​
        // expect(wrapper.find('div').hasClass('App')).toBe(true)
  ​
        const TaskTagTreeList = wrapper.find('TaskTagTreeList').props()
        // expect(TaskTagTreeList.treeData).toBe(Array)
      })
  ​
    })
  })
