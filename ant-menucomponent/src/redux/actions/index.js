import { MENU_CHECKED, MENU_CLOSE } from '../types'
export const menuCheckedAction = ({menuCheckedData=[],menuCheckedKeys=[]}) => ({//menu 选中时触发的action
    type: MENU_CHECKED,
    payload:{
        menuCheckedData,
        menuCheckedKeys    
    }
})
export const menuCloseAction = tagId => ({//tag 关闭时触发的action
    type: MENU_CLOSE,
    payload:{
        tagId    
    }
})
