/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.4
 */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyMenu from './index'
import { BrowserRouter as Router }    from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })   //在使用Enzyme 前需要先适配React对应的版本

const menuList = [
  {
    id: 1,
    url: '/menuDemo',
    name: 'menuDemo component'
  },
]
const setup = () => {
  const propss = {
    menuList,
  }
  const enzymeWrapper = mount( <Router><MyMenu {...propss} /></Router>)
  return {
    enzymeWrapper
  }
}
describe('test menu component', () => {//describe方法表示进行一组单元测试,"测试套件"（Suites）
    it('test menu', () => {//it内部是一组测试中的某一个测试（Specs）
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('div').hasClass('demoMenu')).toBe(true)
      const menuProps = enzymeWrapper.find('Menu').first().props()
      // console.log('mount:',menuProps)
      expect(menuProps.inlineCollapsed).toBe(true)
      expect(menuProps.theme).toEqual('dark')
      expect(menuProps.mode).toEqual('inline')
      expect(menuProps.defaultSelectedKeys).toEqual(['1'])

    })
})






