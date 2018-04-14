import React from 'react';
import { combineReducers } from 'redux'

const mycarlist = [
    {
        id: 1,
        title: 'shangpin1',
        kucun: 3,
    },
    {
        id: 2,
        title: 'shangpin2',
        kucun: 2,
    },
]

const toDel = (list, item) => {
    let _list = [...list];
    for (const [i, v] of _list.entries()) {
        if (v.id === item.id) {
            _list[i] = {
                ..._list[i],
                kucun: _list[i].kucun - 1,
            }
            break;
        }
    }
    return _list
}
const shangpinList = (state = { list: mycarlist }, { type, payload } = {}) => {
    switch(type){
        case 'shangpinDel':
        return {
            ...state,
            list: toDel(state.list, payload.item),
        }
        default:
            return state;
    }
}

const toAdd = (list, item) => {
    let _list = [...list];
    let isHas = false;
    for (const [i, v] of _list.entries()) {
        if (v.id === item.id) {
            _list[i] = {
                ..._list[i],
                yimai: v.yimai + 1,
            }
            isHas = true;
            break;
        }
    }
    if (isHas === false) {
        _list.push({
            ...item,
            yimai: 1,
        });
    }
    return _list
}

const carList = (state = { list: [] }, { type, payload } = {}) => {
    switch(type){
        case 'carAdd':
        return {
            ...state,
            list: toAdd(state.list, payload.item),
        }
        default:
            return state;
    }
}

export default combineReducers({
    shangpinList,
    carList,
})