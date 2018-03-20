import { createStore,combineReducers } from 'redux';
import {INPUT_USERNAME, INPUT_MM} from '../actions';
const userNameReducer = (state={username:'a'},action)=>{ //create reducer 
    // debugger
    switch(action.type){
        case INPUT_USERNAME: return {...state, username: action.username};
        default : return state;

    }
};
const mmReducer = (state={mm:'m'},action)=>{
    const obj = {...state, mm: action.mm};
    switch(action.type){
        case INPUT_MM: return obj;
        default : return state;
    }
};

export const reducer = combineReducers({userNameReducer,mmReducer});//合并reducer