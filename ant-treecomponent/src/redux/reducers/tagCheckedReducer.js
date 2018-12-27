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
const tagCheckedReducer = (state = [], { type, payload={} }) => {
    const { tagCheckedData, id } = payload;
    switch (type) {
        case TAG_CHECKED:
            console.log('reducerTagchecked:', tagCheckedData)
            return [
                ...tagCheckedData
            ]
        case TAG_CLOSE:
            // debugger
            let newState = [...state];
            newState.splice(getArrayIndex(state, 'id', id), 1);
            console.log('reducerTagclose:', newState)
            return newState;
        default:
            return state
    }
}
export default tagCheckedReducer