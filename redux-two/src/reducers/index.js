import { combineReducers } from 'redux';
import {INCREMENT, DECREMENT, INPUTVAL} from '../actions/index';
const countTotal = (state = 666, action)=> {//reducer
    switch(action.type){
        case INCREMENT: 
            return state+1;
        case DECREMENT: 
            return state-1;
        case INPUTVAL: 
            return action.number;   
        default: return state;
    }
}

const counter = (state = 333, action)=>{//reducer
    // return state;
    switch(action.type){
        case INCREMENT: 
            return state+1;
        case DECREMENT: 
            return state-1;
        case INPUTVAL: 
            return action.number;   
        default: return state;
    }
};

export default combineReducers({
    countTotal,
    counter,
});
