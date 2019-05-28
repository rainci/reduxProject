/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.12
 */
import { deleteIdFromData } from './deleteIdFromData'
describe('test utils deleteIdFromData', () => { 
  
    it('test deleteIdFromData fn', () => {//it内部是一组测试中的某一个测试（Specs）
        const data = [1,2,3,4],
        expectData = [1,3,4];
        expect(deleteIdFromData(data,2)).toEqual(expectData)
    })
  })