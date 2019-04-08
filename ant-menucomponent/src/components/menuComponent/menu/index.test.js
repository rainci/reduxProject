/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.4
 */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MenuSide from './index'
Enzyme.configure({ adapter: new Adapter() })   //在使用Enzyme 前需要先适配React对应的版本

const setup = () => {
  const props = {
    subMenuFn: jest.fn(),
    subMenuCheckFn: jest.fn(),
    menuSideStyle: {},
    menuSideData:[{'tagId':1,'name':'test1'},{'tagId':2,'name':'test2'}],
    sampleMenuData:[],
    menuLightData:[],
    menuSideLine:1,
  }
  const enzymeWrapper = mount(<MenuSide {...props} />)
  return {
    enzymeWrapper,
    props,
  }
}
describe('test menuSide component', () => {//describe方法表示进行一组单元测试,"测试套件"（Suites）
    it('should render self', () => {//it内部是一组测试中的某一个测试（Specs）
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('ul').hasClass('menuUl')).toBe(true)
      const menuSideProps = enzymeWrapper.props()
      // console.log('111:',menuSideProps)
      expect(enzymeWrapper.find('li')).toHaveLength(menuSideProps.menuSideData.length)//.toHaveLength可以很方便的用来测试字符串和数组类型的长度是否满足预期 
      // console.log('mount:',menuSideProps)
      // expect(menuProps.inlineCollapsed).toBe(true)
      // expect(menuProps.theme).toEqual('dark')
      // expect(menuProps.mode).toEqual('inline')
      // expect(menuProps.defaultSelectedKeys).toEqual(['1'])

    })
    it('测试', () => {
      const { enzymeWrapper, props:{subMenuCheckFn} } = setup();
      // let result = subMenuCheckFn(1,2);
      const li = enzymeWrapper.find('li').at(0),
            liProps = li.props();
            console.log('liprop:',liProps)
      expect(subMenuCheckFn).toBeCalledTimes(0)//断言subMenuFn被调用了0次
      li.simulate('click')
      // expect(liProps.click).toBeCalledTimes(1)//断言subMenuFn被调用了1次
      expect(li.hasClass('checkedItem')).toBe(false)    
      // // expect(subMenuCheckFn).toBeCalled();// 断言subMenuFn被调用  
      // // liProps.onClick(123)
      // // expect(subMenuCheckFn).toBeUndefined();// 断言subMenuFn的执行后返回undefined
      // // expect(subMenuCheckFn).mockResolvedValue(123)
      
      
      // // expect(props.subMenuCheckFn.mock.calls.length).toBe(0)
      // expect(subMenuCheckFn).toBeCalledTimes(1)//断言subMenuFn被调用了1次
      // expect(subMenuCheckFn).toHaveBeenCalledWith(1,2);//断言mockFn传入的参数为1
    })
})






