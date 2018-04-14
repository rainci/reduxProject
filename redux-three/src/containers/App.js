import React from 'react';
import { connect } from 'react-redux'
import Car from '../components/Car'
import Shangpin from '../components/Shangpin'

const Shop = ({ dispatch, shangpinList = [], carList = [] }) => {
    const handleClick = (clickid) => {
        const item = shangpinList.filter(({ id }) => id === clickid)[0];
        dispatch({
            type: 'carAdd',
            payload: {
                item,
            }
        })
        dispatch({
            type: 'shangpinDel',
            payload: {
                item,
            }
        })
    }
    return (
        <div>
            <Shangpin list={shangpinList} onClick={handleClick} />
            <Car list={carList} />
        </div>
    )
}

// export default connect(({ shangpinList, carList }) => ({ shangpinList: shangpinList.list, carList: carList.list }))(Shop);
export default connect(state => {
    const { shangpinList, carList } = state;
    return {
        shangpinList: shangpinList.list, 
        carList: carList.list,
    }
})(Shop);