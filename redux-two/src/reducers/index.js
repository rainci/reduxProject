import { combineReducers } from 'redux';
import {INCREMENT, DECREMENT} from '../actions/index';
const counterReducer = (state=0,action)=>{
    switch(action.type){
        case INCREMENT : return state + 1;
        case DECREMENT : return state - 1;
        default : return state;
    }
};
export default counterReducer;