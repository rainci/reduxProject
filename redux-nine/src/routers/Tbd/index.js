import React from 'react';
import List from '../../components/List'

const Tbd = () => {
    let list = [
        {
            jtsid: 1,
            jtsname: 'lyx',
        },
        {
            jtsid: 2,
            jtsname: 'whr',
        },
    ]
    list = list.map(({ jtsid, jtsname }) => ({
        id: jtsid,
        name: jtsname
    }))
    return (
        <div>
            Tbd
            <List list={list} />
        </div>
    )
}

export default Tbd
