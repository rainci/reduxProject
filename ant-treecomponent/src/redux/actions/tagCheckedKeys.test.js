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