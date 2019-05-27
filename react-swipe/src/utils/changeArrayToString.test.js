/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.12
 */
import { changeArrayToString } from './changeArrayToString'
describe('test utils changeArrayToString', () => { 
  
  it('test changeArrayToString fn', () => {//it内部是一组测试中的某一个测试（Specs）
      const data = [[
        {tagId: 10001, name: "部队军事"},
        {tagId: 10002, name: "退伍军人"}
      ]],
      expectData = [{tagId:'10001-10002',name:'部队军事-退伍军人'}]
      expect(changeArrayToString({data:data,matchParam:['name','tagId']})).toEqual(expectData)
  })
})