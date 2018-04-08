import { connect } from 'react-redux';
import InputVal from '../components/InputVal'; 
import { inputval } from '../actions/index';//引入actions
const mapStateToProps = (state) => ({//store中的数据作为props绑定到组件中
    value : state.countTotal,
});
const mapDispatchToProps = (dispatch)=>({//将action作为props绑定到组件中
    onChange : (val)=>{
        dispatch(inputval(val));
    }
});
const InputContainer = connect(mapStateToProps,mapDispatchToProps)(InputVal);
export default InputContainer;