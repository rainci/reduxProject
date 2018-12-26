/**
 * 
 * @author rainci(刘雨熙)
 * 利用enzyme[ˈɛnzaɪm]（酶）作为测试引擎，react集成enzyme，所以不用我们单独安装，直接编写即可。
 */
import { TAG_CHECKED_KEYS } from '../types';
import tagCheckedReducer from './tagCheckedKeys'

describe('tagCheckedKeys reducer', () => {//describe方法表示进行一组单元测试（Suites）
  it('should return the initial state', () => {//it内部是一组测试中的某一个测试（Specs）
    const tagCheckedKeys = [];
    const expectedReducer = {
      tagCheckedKeys
    }
    expect(tagCheckedReducer(undefined, {})).toEqual(expectedReducer)
  })
  it('should handle TAG_CHECKED_KEYS', () => {
    const tagCheckedKeys = [],
      tagCheckedKeys2 = ['1', '3'];
    const expectedReducer = {
      tagCheckedKeys
    },
      expectedReducer2 = {
        tagCheckedKeys: tagCheckedKeys2
      }
    expect(
      tagCheckedReducer({}, {
        type: TAG_CHECKED_KEYS,
        payload: {
          tagCheckedKeys
        }
      })
    ).toEqual(expectedReducer)
    expect(
      tagCheckedReducer(
        {
          tagCheckedKeys: ['4']
        },
        {
          type: TAG_CHECKED_KEYS,
          payload: {
            tagCheckedKeys: tagCheckedKeys2
          }
        }
      )
    ).toEqual(expectedReducer2)
  })
})