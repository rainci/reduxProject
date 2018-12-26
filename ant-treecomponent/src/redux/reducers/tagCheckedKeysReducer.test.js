/**
 * 
 * @author rainci(刘雨熙)
 * 利用jest作为测试引擎，react集成jest，所以不用我们单独安装，直接编写即可。
 */
import { TAG_CHECKED_KEYS } from '../types';
import tagCheckedReducer from './tagCheckedKeys'

describe('tagCheckedKeys reducer', () => {
  it('should return the initial state', () => {
    const tagCheckedKeys = [];
    const expectedReducer = {
      tagCheckedKeys
    }
    expect(tagCheckedReducer(undefined, {})).toEqual({
      tagCheckedKeys: []
    })
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