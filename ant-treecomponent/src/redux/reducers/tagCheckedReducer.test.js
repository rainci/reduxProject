/**
 * 
 * @author rainci(刘雨熙)
 */
import { TAG_CHECKED } from '../types';
import tagCheckedReducer from './tagCheckedReducer';
describe('tag checked reducer', () => {//describe方法表示进行一组单元测试（Suites）
    it('should create an checked reducer', () => {//it内部是一组测试中的某一个测试（Specs）
      const tagCheckedData = [{'123':'顶级-人物-奥巴马'}],
      tagCheckedKeys = [];
      const action = {
          type: TAG_CHECKED,
          payload: {
            tagCheckedData,
            tagCheckedKeys 
          }
      }
      const expectedReducer = {
        tagCheckedData, 
        tagCheckedKeys 
      }
      expect(tagCheckedReducer({},action)).toEqual(expectedReducer)
    })
  })