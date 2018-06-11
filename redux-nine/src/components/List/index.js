import React from 'react';



const List = ({ list }) => {
    if (!list || !list.length) {
        return null;
    }
    return (
        <ul>
            {
                list.map(({ id, name }) => <li key={id}>{name}</li>)
            }
        </ul>
    )
}

export default List
