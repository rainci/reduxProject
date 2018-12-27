import { combineReducers} from 'redux';
import checkedUsersRole from './tagCheckedKeys'
import tagCheckedReducer from './tagCheckedReducer'

export default combineReducers({
    checkedUsersRole,
    tagCheckedReducer
})