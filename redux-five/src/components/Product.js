import React , { Component }  from 'react';
import PropTypes from 'prop-types';
debugger
const Product = ({productList,ADDTOCAR}) => (
    <ul>
        {
            productList.map(({title,kucun,price,id}) => (
                <li key={id}>
                    <p>{title} - &#36;{price}{kucun ? `x ${kucun}` : null} </p>
                    <button id={id} onClick = {kucun ? ADDTOCAR : null}>{kucun ? 'addToCar':'sellOut'}</button>   
                </li>
            ))
        }
    </ul>
);
Product.propTypes = {
    productList : PropTypes.array.isRequired,
    ADDTOCAR : PropTypes.func
}
export default Product;