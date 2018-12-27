import { TAG_CHECKED, TAG_CLOSE } from '../types'
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
const defaultState = {
    tagCheckedData: [],
    tagCheckedKeys:['1'] 
}
const dealData = data => {
    let allId = [];
    for(const {id} of data){
        const itemId = id.split(',');
        allId = [...allId,...itemId];
    }
    return [...new Set(allId)];
}
const tagCheckedReducer = (state = defaultState, { type, payload={} }) => {
    const { tagCheckedData, tagCheckedKeys, id } = payload;
    switch (type) {
        case TAG_CHECKED:
            console.log('reducerTagchecked:', tagCheckedData,tagCheckedKeys)
            return {
                ...state,
                tagCheckedData,
                tagCheckedKeys
            }
                
            
        case TAG_CLOSE:
            let newState = [...state.tagCheckedData];
            newState.splice(getArrayIndex(state.tagCheckedData, 'id', id), 1);
            let newCheckedKeys = dealData(newState);
            console.log('reducerTagclose:', newState,newCheckedKeys)
            return {
                tagCheckedData: newState,
                tagCheckedKeys: newCheckedKeys
            };
        default:
            return state
    }
}
export default tagCheckedReducer