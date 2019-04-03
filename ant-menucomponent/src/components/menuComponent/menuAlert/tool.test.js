/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.2
 */
import { checkHasChildrenFn } from './tool'

/**
 * 
 * @param {Array} data 
 * @param {Array[{}]} itemChildren 
 * @return {Boolean} 
 * @author rainci(刘雨熙)
 * 检测data数组里的值是否有itemChildren数组里的孩子的id
 */
describe('check whether has children', () => {//describe方法表示进行一组单元测试,"测试套件"（Suites）
    it('should create an checked reducer', () => {//it内部是一组测试中的某一个测试（Specs）
        const data = ['1','2','3'],
        itemChildren = [{tagId:1},{tagId:2}];
        expect(checkHasChildrenFn(data,itemChildren)).toEqual(true)
    })
})
