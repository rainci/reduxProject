/* eslint-disable  */
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
function setup() {
  const props = {
    menuList,
  }
  const enzymeWrapper = mount( <Router><MyMenu {...props} /></Router>)
  return {
    enzymeWrapper
  }
}
describe('test menu component', () => {//describe方法表示进行一组单元测试,"测试套件"（Suites）
    it('test menu', () => {//it内部是一组测试中的某一个测试（Specs）
      const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('div').hasClass('demoMenu')).toBe(true)
    })
})






