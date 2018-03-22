import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Counter extends Component {
    constructor(props){
        super(props);
        this.incrementIfEven = this.incrementIfEven.bind(this);
        this.incrementAsync = this.incrementAsync.bind(this);    
    }
    static defaultProps = {//默认props
        info: '练习默认props、PropTypes检测类型、dispatch传递'
    }
    incrementIfEven(){
        const {value,onIncrement} = this.props;
        if(value%2 === 0){
            onIncrement();
        }
    }
    incrementAsync(){
        const {onIncrement} = this.props;
        setTimeout(onIncrement,1000);
    }
    render(){
        const {value,onIncrement,onDecrement,info} = this.props;
        return(
            <div>
                <p>{info}</p>
                <p>clicked: {value} time.</p>
                <p><button onClick={onIncrement}>+</button><button onClick={onDecrement}>-</button></p>
                <p><button onClick={this.incrementIfEven}>even+</button><button onClick={this.incrementAsync}>async+</button></p>
                
            </div>
        )
    }
}
Counter.propTypes = {//类型检测
    info : PropTypes.string.isRequired,
    value : PropTypes.number.isRequired,
    onIncrement : PropTypes.func,
    onDecrement : PropTypes.func
};

export default Counter;