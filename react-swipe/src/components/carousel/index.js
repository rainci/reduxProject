import React, {PureComponent} from 'react';
import { Carousel, Icon } from 'antd';
import './index.less'
import logo from '../../logo.svg'
import ReactDOM from 'react-dom';

class CarouselSlide extends PureComponent {
    state = {
        carouseProp : {
            dots: false,
            autoplay: true
        }
    }
    handlePrev = ()=>{//pre
        this.refs.carous.prev(); //ref = img
      }
    handleNext = ()=>{//next
        this.refs.carous.next();
    }
    countImg = ()=> {
        let { offsetWidth, offsetHeight } = ReactDOM.findDOMNode(this.refs.carouselBox)
        console.log(offsetWidth,offsetHeight)
    }
    componentDidMount(){
        this.countImg()
    }
    render(){
        let { slideData = [{name:1},{name:2},{name:3},{name:4}] } = this.props;
        return (
            <div className='carouselBox' ref="carouselBox">
                <Carousel ref="carous" {...this.state.carouseProp}>
                    {
                        slideData.map(item => {
                            let { name } = item;
                            return(
                                <div className={'carouselSlide'}>
                                    {/* <h3>{name}</h3> */}
                                    <img src={logo} ></img>
                                </div>
                            )
                        })    
                    }
                </Carousel>
                <span className='carouselPre' onClick={this.handlePrev}><Icon type="left" style={{color:'white'}}/></span>
                <span className='carouselNext' onClick={this.handleNext}><Icon type="right" style={{color:'white'}} /></span>

            </div>
    
        )
    }
    
}
export default CarouselSlide

