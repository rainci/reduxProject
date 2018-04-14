import React from 'react';

const Car = ({ list = [] }) => {
    return (
        <ul>
                {
                    list.map(({ title, id, yimai = 0 }) => (
                        <li key={id}> shangpin: {title} ,  yimai: {yimai} </li>
                    ))
                }
            </ul>
    )
}

export default Car;