import React, { Component } from 'react';
import './input.css';
import PropTypes from 'prop-types';
class InputVal extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        const {onChange} = this.props;
        const val = e.target.value*1;
        onChange(val);
    }
    render(){
        const {value} = this.props;
        return(
            <p><input defaultValue = {value} onChange={this.onChange} /></p>
        );
    }
}
InputVal.propTypes = {//类型检测
    value : PropTypes.number,
    onChange : PropTypes.func,
};

export default InputVal;