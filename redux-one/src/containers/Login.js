import React, { Component } from 'react';
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            papssword : ''
        };
        this.nameChange = this.nameChange.bind(this);
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    render(){
        const { username } = this.props;
        return(
            <div>
                <div>早上好，{ username }</div>
                <div>用户名：<input defaultValue = {this.state.name} onChange={this.nameChange}/></div>
                <div>密　码：<input type="papssword"/></div>
                <button>登录</button>
            </div>
        )
    }
}
export default Login;