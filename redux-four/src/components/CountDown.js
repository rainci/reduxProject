import React , { Component }  from 'react';
import PropTypes from 'prop-types';

class CountDown extends Component {
    constructor(props){
        super(props);
        this.state = {num: 5};
        this.countDown = this.countDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(){
        let {num} = this.state;
        if(num){
            this.setState({
                num: num-1
            });
        }
        console.log('1')
    }
    countDown(){
        this.timer = setInterval(this.handleChange,1000);
    }
    componentDidMount(){
        this.countDown();
    }
    componentDidUpdate(){
        let {num} = this.state;
        if(!num){
            clearInterval(this.timer)
        }
    }
    render(){
        let {num} = this.state;
        return(
            <div>
                <h2>d</h2>
                <p>{num}</p>
            </div>
        )
    }
}
export default CountDown;