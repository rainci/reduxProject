import { combineReducers} from 'redux';
import commonDataReducer from './commonDataReducer'//公共数据reducer
import menuPageReducer from './menuPageReducer'//menupage reducer
export default combineReducers({
    commonDataReducer,
    menuPageReducer,
})