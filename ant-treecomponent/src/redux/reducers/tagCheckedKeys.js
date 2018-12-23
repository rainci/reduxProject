import { TAG_CHECKED_KEYS } from '../types';
const defaultState = {
  tagCheckedKeys: []
};
const tagCheckedKeys = (state = defaultState, {type, payload}) => {
    switch (type) {
      case TAG_CHECKED_KEYS:     
      return {
      ...state,
      tagCheckedKeys:  payload.tagCheckedKeys 
      }
      default:
        return state
    }
  }
  
  export default tagCheckedKeys
  