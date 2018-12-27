import { TAG_CHECKED_KEYS, TAG_CHECKED, TAG_CLOSE } from '../types'

export const tagCheckedKeys = tagCheckedKeys => ({
  type: TAG_CHECKED_KEYS,
  payload: {
    tagCheckedKeys  
  }
})

export const tagCheckedAction = (tagCheckedData=[]) => ({//tag 选中时触发的action
    type: TAG_CHECKED,
    payload:{
        tagCheckedData    
    }
})
export const tagCloseAction = (id) => ({//tag 关闭时触发的action
    type: TAG_CLOSE,
    payload:{
        id    
    }
})
