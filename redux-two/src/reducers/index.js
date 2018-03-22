import { combineReducers } from 'redux';
import {INCREMENT, DECREMENT,INPUTVAL} from '../actions/index';
const reducer = (state=0,action)=>{
    switch(action.type){
        case INCREMENT : return state+1;
        case DECREMENT : return state-1;
        case INPUTVAL : return action.number;
        default : return state;
    }
};

export default reducer;
