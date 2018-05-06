import React , { Component }  from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
const Product = ({productList,onClick}) => (
    <ul>
        {
            productList.map(({title,kucun,price,id}) => (
                <li key={id}>
                    <p>{title} - &#36;{price}{kucun ? `x ${kucun}` : null} </p>
                    <button id={id} onClick = {kucun ? onClick : null}>{kucun ? 'addToCar':'sellOut'}</button>   
                </li>
            ))
        }
    </ul>
);
export default Product;