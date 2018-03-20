import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {LoginContainer} from './containers/LoginContainer'; 
import {ShowContainer} from './containers/ShowContainer'; 
import {reducer} from './reducers/index'; 


import './index.css';

// const inputUsername = (username)=> ({type:'INPUT_USERNAME',username});//add new action inputUsername
// const inputMm = (mm)=>({type:'INPUT_MM',mm}); //add new action mm

const store = createStore(reducer);
console.log('store',store.getState())

// class Login extends Component {
//     constructor(props){
//         super(props)
//         this.nameChange = this.nameChange.bind(this);
//         this.mmChange = this.mmChange.bind(this);
//     }
//     nameChange(e){
//         // debugger
//         const { dispatch } = this.props;
//         dispatch(inputUsername(e.target.value));//利用store.dispatch(action)原理
//     }
//     mmChange(e){
//         // debugger
        
//         const { dispatch } = this.props;
//         dispatch(inputMm(e.target.value));//利用store.dispatch(action)原理        
//     }
//     render(){
//         const { username,mm } = this.props;
//         // debugger
//         return(
//             <div>
//                 <div>早上好，{ username }</div>
//                 <div>用户名：<input defaultValue = {username} onChange={this.nameChange}/></div>
//                 <div>密　码：<input type="papssword" onChange={this.mmChange}/>{mm}</div>
//                 <button>登录</button>
//             </div>
//         )
//     }
// }

// const LoginContainer = connect((state) => ({
//     username: state.userNameReducer.username,
//     mm: state.mmReducer.mm,
// }))(Login);

// const ShowLogin = (props)=>{
//     return (
//         <h5>{props.name}</h5>
//     );
// };
// const ShowContainer = connect((state) => ({
//     name: state.userNameReducer.username,
// }))(ShowLogin);
// const LogoutContainer = connect((state) => ({
//     username: state,
// }))(Logout);



// state;
// function connect(s2p){ //模拟connect
//     let p = s2p(state);
//     return function (Com){
//         return <Com { ...p } />
//     }
// }


// class App extends Component {
//     render(){
//         return (
//             <LoginContainer />
//         )
//     }
// }



ReactDOM.render(
    <Provider store={store}>
        <div>
            <LoginContainer />
            <ShowContainer />
        </div>
    </Provider>,
    document.getElementById('root')
);
store.subscribe(function(){
    console.log('store:', store.getState())
});
// ReactDOM.render(<Login />, document.getElementById('root'));
