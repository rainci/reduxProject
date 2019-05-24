import React, { PureComponent, Fragment } from 'react';
import { Carousel, Icon, Tag } from 'antd';
import './index.less'
import noImg from './noImg.png'
import hotIcon from './icon_hot.png'
import ReactDOM from 'react-dom';

class CarouselSlide extends PureComponent {
    state = {
    }
    static defaultProps = { 
        carouseProp: { //轮播图默认属性
            dots: false,
            autoplay: false
        }
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//为state设置新的value
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /***********业务方法 begin **************/
    _handlePrev = () => {//轮播图pre btn
        this.refs.carous.prev(); //ref = img
    }
    _handleNext = () => {//轮播图next btn
        this.refs.carous.next();
    }
    _countSlideBoxFn = () => {//轮播图box宽高计算
        let { offsetWidth, offsetHeight } = ReactDOM.findDOMNode(this.refs.carouselBox)
        console.log(offsetWidth, offsetHeight, this.refs.carouselBox)
        this.setState({
            slideHeight: offsetHeight
        })
    }
    _countImgFn = e => { //图片计算
        let { width, height } = e.target || {};
        let imgScale = (width/height).toFixed(2);
        let { offsetWidth, offsetHeight } = ReactDOM.findDOMNode(this.refs.carouselImgBox);
        let imgBoxScale = (offsetWidth/offsetHeight).toFixed(2);
        let imgStyle = {}
        if(imgScale > imgBoxScale) {
            imgStyle.height = '100%';
        }else{
            imgStyle.width = '100%';
        }
        Object.assign(e.target.style, { ...imgStyle });
    }
    showImgFn = (url) => {//图片点击回调
        this.props.showBigImgFn && this.props.showBigImgFn(url)
    }
    infomationFn = (item) => { //tag点击展示详情页callback
        this.props.onInformationFn && this.props.onInformationFn(item)
    }
    /***********业务方法 end **************/
    /***********生命周期 begin **************/
    componentDidMount() {
        this._countSlideBoxFn()//重新计算slide box 高度    
    }
    componentWillReceiveProps(nextProps){
        const { layoutResize } = nextProps;
        if(layoutResize && layoutResize !== this.state.layoutResize){
            this._countSlideBoxFn()//重新计算slide box 高度  
            this.setStateValueFn('layoutResize',layoutResize)  
        }
    }
    /***********生命周期 end **************/
    render() {
        let {
            slideData ,
            videoComFlag = true
        } = this.props;
        let st = { 'height': `${this.state.slideHeight}px` };
        return (
            <div className='carouselBox' ref="carouselBox">
                <Carousel ref="carous" {...this.props.carouseProp}>
                    {
                        slideData && this.state.slideHeight ? slideData.map((item,index) => {
                            let { title, publishTime, sourceName, author, heatValue, duration, sourceUrl } = item;
                            return (
                                <div className='carouselEvery' key = {index}>
                                    <div className='carouselSlide' style={{ ...st }}>
                                        <div className='carouselSlideImg' ref='carouselImgBox'>
                                            {
                                                videoComFlag ? 
                                                <Fragment>
                                                    <a href={sourceUrl} target='_blank' rel='noopener noreferrer'><img resize={this.state.layoutResize} onLoad={e => this._countImgFn(e)} src={sourceUrl || noImg} /></a>
                                                    <p className='carouselTime'>{duration}</p> 
                                                </Fragment>
                                                : 
                                                <img resize={this.state.layoutResize}  onLoad={e => this._countImgFn(e)} src={sourceUrl || noImg} onClick={() => this.showImgFn((sourceUrl || noImg))} />
                                            }
                                            
                                        </div>
                                        <div className='carouselSlideTxt'>

                                            <h2 title={title}>
                                                <span className='carouselTitle'>{title}</span>
                                                <div className='carouselUnit'>
                                                    <span><img src={hotIcon} alt=""/></span><span>{heatValue}</span><span>单位</span>
                                                </div>
                                                <Tag className='carouselInfoTag' color='#108ee9' onClick={() => this.infomationFn(item)}>详情</Tag>

                                            </h2>
                                            <div className='carouselDes'>
                                                <span>{publishTime}</span><span>{sourceName}</span><span>{author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                    }
                </Carousel>
                {
                    slideData && slideData.length ? 
                    <Fragment>
                        <span className='carouselPre' onClick={this._handlePrev}><Icon type="left" style={{ color: 'white' }} /></span>
                        <span className='carouselNext' onClick={this._handleNext}><Icon type="right" style={{ color: 'white' }} /></span>
                    </Fragment>       
                    
                : null
                }
                

            </div>

        )
    }

}
export default CarouselSlide

