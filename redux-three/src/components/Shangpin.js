import React from 'react';

const Shangpin = ({ onClick, list = [] }) => {
    
    return (
        <div>
            <ul>
                {
                    list.map(({ title, id, kucun = 0 }) => {
                        const buttonProps = {}
                        kucun && (buttonProps.onClick = onClick.bind(null, id))
                        return (
                            <li key={id}>
                                shangpin: {title} , 
                                kucun: {kucun}
                                <button {...buttonProps}>{kucun > 0 ? 'add' : 'setout'}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Shangpin;