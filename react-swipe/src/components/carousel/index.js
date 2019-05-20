import React, {PureComponent} from 'react';
import { Carousel, Icon, Tag } from 'antd';
import './index.less'
import logo from '../../logo.svg'
import ReactDOM from 'react-dom';

class CarouselSlide extends PureComponent {
    state = {
        carouseProp : {
            dots: false,
            autoplay: false
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
        console.log(offsetWidth,offsetHeight, this.refs.carouselBox)
    }
    componentDidMount(){
        this.countImg()
    }
    render(){
        let { 
            slideData = [{name:1,title:'slide1 介绍slide1 介绍slide1 介绍', publishTime: '2019.5.20', 'sourceName': '腾讯', 'author': '熙世界'},
                {name:2},
                {name:3},
                {name:4}] 
            } = this.props;
        return (
            <div className='carouselBox' ref="carouselBox">
                <Carousel ref="carous" {...this.state.carouseProp}>
                    {
                        slideData.map(item => {
                            let { name, title, publishTime, sourceName, author, unit=10000  } = item;
                            return(
                                <div className='carouselSlide'>
                                    <div className='carouselSlideImg'>
                                        <img src={logo} />
                                    </div>
                                    <div className='carouselSlideTxt'>
                                        <h2 title={title}>
                                            <span className='carouselTitle'>{title}</span>
                                            <h3 className='carouselUnit'>
                                                <Icon type="retweet" /><span>{unit}</span><span>单位</span>
                                            </h3>
                                            <Tag className='carouselInfoTag' color='#108ee9' onClick={() => this.infomationFn(item)}>详情</Tag>

                                        </h2>
                                        <div className='carouselDes'>
                                            <span>{publishTime}</span><span>{sourceName}</span><span>{author}</span>
                                        </div>
                                    </div>
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

