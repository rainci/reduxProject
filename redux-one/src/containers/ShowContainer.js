import { Provider,connect } from 'react-redux';
import ShowLogin from '../components/Show/index'; 

export const ShowContainer = connect((state) => ({
    name: state.userNameReducer.username,
}))(ShowLogin);