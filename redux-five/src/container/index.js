import React from 'react'
import { connect } from 'react-redux'
import Product from '../components/Product'

const list = [
    {
        title : 'pro1',
        id : 1,
        price : 100,
        kucun :3
    },
    {
        title : 'pro2',
        id : 2,
        price : 80,
        kucun :4
    },
];

const App = connect((state = {list : list}) =>({
    productList :  state.list
})
)(Product);
export default App;