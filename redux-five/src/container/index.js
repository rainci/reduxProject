import React from 'react'
import { connect } from 'react-redux'
import Product from '../components/Product'

const Pro = (dispatch,productList) => {
    const handleclick = (cid) => {
        const item = productList.filter(({id})=> id === cid )[0];
        dispatch({
            type : 'ADDTOCAR',
            payload : {item}
        })
    }
    return (
        <Product productList = {productList} ADDTOCAR = {handleclick}/>
    )
};
const mapDispatchToProps = (dispatch) => ({
    ADDTOCAR(){
        dispatch({type: 'ADDTOCAR'})
    },
    MOVEOUT(){
        dispatch({type: 'MOVEOUT'})
    }

});

const App = connect(state =>{
    return {
        productList :  state.productList.shangpinList
    }
})(Pro);
export default App;