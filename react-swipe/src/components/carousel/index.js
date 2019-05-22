import React, { PureComponent, Fragment } from 'react';
import { Carousel, Icon, Tag } from 'antd';
import './index.less'
import noImg from './noImg.png'
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
        console.log(imgScale,imgBoxScale)
        if(imgScale > imgBoxScale) {
            imgStyle.height = '100%';
        }else{
            imgStyle.width = '100%';
        }
        Object.assign(e.target.style, { ...imgStyle });
    }
    showImgFn = (url) => {//图片点击回调
        console.log('url:',url)
        this.props.showBigImgFn && this.props.showBigImgFn(url)
    }
    infomationFn = (item) => { //tag点击展示详情页callback
        this.props.onInformationFn && this.props.onInformationFn(item)
    }
    /***********业务方法 end **************/
    /***********生命周期 begin **************/
    componentDidMount() {
        this._countSlideBoxFn()
    }
    /***********生命周期 end **************/
    render() {
        let {
            slideData = [
                { title: 'slide1 介绍slide1 介绍slide1 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: '', duration: '2:10:23', heatValue: 12 },
                { title: 'slide2 介绍slide2 介绍slide2 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558514629952&di=117f807be378fbcf191a817c6bc46499&imgtype=0&src=http%3A%2F%2Fpic21.nipic.com%2F20120510%2F7336507_204436122000_2.jpg', duration: '2:10:23', heatValue: 12 },
                { title: 'slide3 介绍slide3 介绍slide3 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558514907022&di=644b6c3a654e4d8157c65ffcbc9ed259&imgtype=0&src=http%3A%2F%2Fimgtianqi.eastday.com%2Fres%2Fupload%2Fue%2Fimage%2F20180610%2F1528632250128910.jpeg', duration: '2:10:23', heatValue: 12 },
                ],
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
                                                    <a href={sourceUrl} target='_blank' rel='noopener noreferrer'><img onLoad={e => this._countImgFn(e)} src={sourceUrl || noImg} /></a>
                                                    <p className='carouselTime'>{duration}</p> 
                                                </Fragment>
                                                : 
                                                <img onLoad={e => this._countImgFn(e)} src={sourceUrl || noImg} onClick={() => this.showImgFn((sourceUrl || noImg))} />
                                            }
                                            
                                        </div>
                                        <div className='carouselSlideTxt'>

                                            <h2 title={title}>
                                                <span className='carouselTitle'>{title}</span>
                                                <div className='carouselUnit'>
                                                    <Icon type="retweet" /><span>{heatValue}</span><span>单位</span>
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

