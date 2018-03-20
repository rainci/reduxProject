import React, { Component } from 'react';
import {inputUsername,inputMm} from '../../actions/index'; 


class Login extends Component {
    constructor(props){
        super(props)
        this.nameChange = this.nameChange.bind(this);
        this.mmChange = this.mmChange.bind(this);
    }
    nameChange(e){
        // debugger
        const { dispatch } = this.props;
        dispatch(inputUsername(e.target.value));//利用store.dispatch(action)原理
    }
    mmChange(e){
        // debugger
        
        const { dispatch } = this.props;
        dispatch(inputMm(e.target.value));//利用store.dispatch(action)原理        
    }
    render(){
        const { username,mm } = this.props;
        // debugger
        return(
            <div>
                <div>早上好，{ username }</div>
                <div>用户名：<input defaultValue = {username} onChange={this.nameChange}/></div>
                <div>密　码：<input type="papssword" onChange={this.mmChange}/>{mm}</div>
                <button>登录</button>
            </div>
        )
    }
}
export default Login;