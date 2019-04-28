/**
 * @author rainci(刘雨熙)
 * @time 2019.3.27
 */
import { MENU_CHECKED, MENU_CLOSE } from '../types'
import produce from 'immer'

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
const menuPageReducer = produce((state = defaultState, { type, payload = {} }) => {//menuPage reducer
    let { menuCheckedKeys, menuCheckedData, tagId } = payload;
    switch (type) {
        case MENU_CHECKED:
            state.menuCheckedKeys = menuCheckedKeys;
            state.menuCheckedData = menuCheckedData;
            return;
        case MENU_CLOSE:
            state.menuCheckedData.splice(getArrayIndex(state.menuCheckedData, 'tagId', tagId), 1);
            state.menuCheckedKeys = dealData(state.menuCheckedData);
            return
             // let newMenuCheckedData = [...state.menuCheckedData];
            // newMenuCheckedData.splice(getArrayIndex(state.menuCheckedData, 'tagId', tagId), 1);
            // let newMenuCheckedKeys = dealData(newMenuCheckedData);
            // return {
            //     menuCheckedData: newMenuCheckedData,
            //     menuCheckedKeys: newMenuCheckedKeys
            // };
        default:
            return state
    }
})
export default menuPageReducer;