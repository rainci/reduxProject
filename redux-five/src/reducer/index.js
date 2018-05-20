import { combineReducer } from 'redux';
const prolist = [
    {
        title : 'pro1',
        id : 1,
        price : 100,
        kucun :3
    },
    {
        title : 'pro2',
        id : 2,
        price : 80,
        kucun :4
    },
];
let addCar = (list, item) => {
    let _list = list;
    for(const[key, val] of _list.entries()){
        if(val.id === item.id){
            _list[key] = {
                ..._list[key],
                kucun: _list[key].kucun - 1
            }
            break;
        }
    }
    return _list;
};
let reducer = (state = {productList: prolist},{type, payload} = {})=>{
    switch(type){
        case 'ADDTOCAR':
            return {
                ...state,
                productList: addCar(state.productList, payload.item)
            };
        // case 'MOVEOUT':
        //     return ;
        default:
            return state;   
    }
};
export default reducer;