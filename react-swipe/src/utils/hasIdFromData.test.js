/**
 * 
 * @param {Array} data 
 * @param {Number} id 
 * @return {Boolean} 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 * 检测data数组里的值是否有id
 */
/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.12
 */
import { hasIdFromDataFn } from './hasIdFromData'
describe('test utils hasIdFromDataFn', () => {

    it('test hasIdFromDataFn fn', () => {//it内部是一组测试中的某一个测试（Specs）
        const data = [1,3,8];
        expect(hasIdFromDataFn(data,3)).toEqual(true)
        expect(hasIdFromDataFn(data,6)).toEqual(false)
    })
})
