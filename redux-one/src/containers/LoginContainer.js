import { Provider,connect } from 'react-redux';
import Login from '../components/Login/index'; 

export const LoginContainer = connect((state) => ({
    username: state.userNameReducer.username,
    mm: state.mmReducer.mm,
}))(Login);