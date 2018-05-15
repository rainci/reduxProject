// import React,{component} from 'react';
import React , { Component }  from 'react';

class ShowVal extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : 0
        }
    }
    componentDidMount(){
        // 同步代码暂不执行，保存一个value+1，当异步执行时，调用这一个value+1
        this.setState({
            value: this.state.value+1
        })
        console.log(1,this.state.value)
        this.setState({
            value : this.state.value+1
        })
        console.log(2,this.state.value)
        
        this.setState({
            value : this.state.value+1
        })
        console.log(3,this.state.value)
        
        setTimeout(()=>{
            this.setState({
                value : this.state.value+1
            })
            console.log(4,this.state.value)
            
            this.setState({
                value : this.state.value+1
            })
            console.log(5,this.state.value)
            
        },3000)
    }
    render(){
        let {value} = this.state;
        return(
            <div>{value}</div>
        )
    }

}
export default ShowVal;