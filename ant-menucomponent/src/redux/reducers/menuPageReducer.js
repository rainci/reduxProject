/**
 * @author rainci(刘雨熙)
 * @time 2019.3.27
 */
import { MENU_CHECKED, MENU_CLOSE } from '../types'
const getArrayIndex = (array, key, value) => {
    let i;
    array.some((val, index) => {
        if (val[key] == value) {
            i = index;
        }
        return (val[key] == value);
    })
    return i
}
const dealData = data => {
    let allId = [];
    for(const {tagId} of data){
        const itemId = tagId.split('-');
        allId = [...allId,...itemId];
    }
    return [...new Set(allId)];
}
const defaultState = {
    menuCheckedKeys: ["10085", "10089", "10087"],//menu checkedKeys
    menuCheckedData: [],
}
const menuPageReducer = (state = defaultState, { type, payload = {} }) => {//menuPage reducer
    let { menuCheckedKeys, menuCheckedData, tagId } = payload;
    switch (type) {
        case MENU_CHECKED:
            return {
                ...state,
                menuCheckedKeys,
                menuCheckedData,
            }
        case MENU_CLOSE:
            let newMenuCheckedData = [...state.menuCheckedData];
            newMenuCheckedData.splice(getArrayIndex(state.menuCheckedData, 'tagId', tagId), 1);
            let newMenuCheckedKeys = dealData(newMenuCheckedData);
            return {
                menuCheckedData: newMenuCheckedData,
                menuCheckedKeys: newMenuCheckedKeys
            };
        default:
            return state
    }
}
export default menuPageReducer;