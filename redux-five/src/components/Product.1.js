import React , { Component }  from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

export const ProInfo = ({ title,kucun,price}) => (// create info
    <p>
       {title} - &#36;{price}{kucun ? `x {kucun}` : null} 
    </p>
);
const ProButton = ({id,kucun,onClick}) => ( // create button
    <button id={id} onClick = {kucun ? onClick : null}>{kucun ? 'addToCar':'sellOut'}</button>
);
const Item = ({title,kucun,price,id,onClick})=> ( // create everyone product
    <li key={id}>
        <ProInfo title={title} kucun={kucun} price = {price} />
        <ProButton id={id} kucun={kucun} onClick={onClick} />
    </li>
);
export const Product = ({productList,onClick}) => (
    <ul>
        {
            productList.map(({title,kucun,price,id}) => (
                <Item title={title} kucun={kucun} price={price} id={id} onClick={onClick} />
            ))
        }
    </ul>
);