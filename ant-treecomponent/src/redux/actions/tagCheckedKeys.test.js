/**
 * 
 * @author rainci(刘雨熙)
 * 利用jest作为测试引擎，react集成jest，所以不用我们单独安装，直接编写即可。
 */
import * as actions from './index'
import { TAG_CHECKED_KEYS } from '../types'

describe('actions', () => {
  it('should create an action to reset tagCheckedKeys', () => {
    const tagCheckedKeys = [];
    const expectedAction = {
      type: TAG_CHECKED_KEYS,
      payload: {
        tagCheckedKeys
      }
    }
    expect(actions.tagCheckedKeys(tagCheckedKeys)).toEqual(expectedAction)
  })
})