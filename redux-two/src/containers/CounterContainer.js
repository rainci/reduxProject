import { connect } from 'react-redux';
import Counter from '../components/Counter'; 
import {increment,decrement} from '../actions/index';//引入actions
const mapStateToProps = (state) => ({//store中的数据作为props绑定到组件中
    value : state.counter,
});
const mapDispatchToProps = (dispatch)=>({//将action作为props绑定到组件中
    onIncrement : ()=>{
        dispatch(increment());
    },
    onDecrement : ()=>{
        dispatch(decrement());
    },
});
const CounterContainer = connect(mapStateToProps,mapDispatchToProps)(Counter);
export default CounterContainer;