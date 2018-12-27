/**
 * 
 * @author rainci(刘雨熙)
 */
import { TAG_CHECKED, TAG_CLOSE } from '../types';
import { tagCheckedAction, tagCloseAction } from './index';

describe('tag_actions', () => {
    it('should create an action about create tag', () => {//test tag选中时触发的action
      const tagCheckedData = [],
            tagCheckedKeys = [];
      const expectedAction = {
        type: TAG_CHECKED,
        payload: {
          tagCheckedData,
          tagCheckedKeys
        }
      }
      expect(tagCheckedAction(tagCheckedData,tagCheckedKeys)).toEqual(expectedAction)
    })

    it('should create an action about close tag', () => {//test tag关闭时触发的action
      const id = '123';
      const expectedAction = {
        type: TAG_CLOSE,
        payload: {
            id
        }
      }
      expect(tagCloseAction(id)).toEqual(expectedAction)
    })
  })
