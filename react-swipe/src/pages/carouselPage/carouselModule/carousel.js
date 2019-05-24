/**
 * 
 * @param {Array} slideData slide数据
 * @param {Boolen} videoComFlag 是否是视频轮播
 * @param {String} layoutResize 通过接收此值，是否从新计算内部轮播高度
 * @return {component} CarouselBox 
 * @author rainci(刘雨熙)
 * @time 2019.5.23
 */
import React, {PureComponent, Fragment} from 'react';
import CarouselSlide from '../../../components/carousel'
import BigImg from '../../../components/bigImg/bigImg'
import ImgVideoAlert from '../../../components/imgVideoAlert';
import { alertLiData } from './viewVariable';
class CarouselBox extends PureComponent {
    state = {
        bigImgIsShow: false,
        slideDatas: this.props.slideData || []

    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//为state设置新的value
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    _infoFn = item => {//详情展示
        this.setStateValueFn('detailAlertShow', true)
        this.alertResourceData = item;
    } 
    _bigImgFn = url => {//图片放大
        this.setStateValueFn('imgUrl', url)
        this.setStateValueFn('bigImgIsShow', true)    
    }  
    _bigImgCloseFn = () => {//图片关闭
        this.setStateValueFn('bigImgIsShow', false)    
    }
    _timeTransform = (num) => {//计算时分秒
        // var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = this._timeZero(parseInt((num % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        var minutes = this._timeZero(parseInt((num % (1000 * 60 * 60)) / (1000 * 60)));
        var seconds = this._timeZero(Math.floor((num % (1000 * 60)) / 1000));
        return hours + ":" + minutes + ":" + seconds;
    }
    _timeZero = (t) => {
        let m="";
        if(t>0){
            if(t<10){
                m="0"+t;
            }else{
                m=t+"";
            }
        }else{
            m="00";
        }
        return m;
    } 
    _transformNum = (num) => {
        let newNum = (parseInt(num*10000)/100).toFixed(2) + "%";
        return newNum
    }
    _dealSlideDataFn = slideData => {
        slideData && slideData.length && slideData.map( item => {
            let { duration } = item;
            item.duration = duration && this._timeTransform(duration)
            if(item.tagList && item.tagList.length>0){
                item.tagList.map((obj,i)=>{
                    obj.splice(0,1); 
                    if(item.tags && item.tags.length){
                        item.tags.map((everyone,j)=>{
                            if(everyone.tagId == obj[obj.length - 1].tagId){
                                obj.push({
                                    tagId:Math.random(),
                                    name:everyone.tagStatus == "ai" ? "[" + this.transformNum(everyone.confidence) + "]" : "[人工纠偏]"
                                });
                            }
                        })
                    }
                })
            }  
        })
        return slideData;
    }
    componentWillReceiveProps(nextProps){
        const { slideData } = nextProps;
        if(slideData && slideData.length){
            let slideDatas = this._dealSlideDataFn(slideData);
            this.setStateValueFn('slideDatas', slideDatas)
        }
    }
    render() {
        let { videoComFlag=false, layoutResize } = this.props;
        let { imgUrl, bigImgIsShow, slideDatas } = this.state;   
        return(
            <Fragment>
                <div className='carouselPage' style={{'width':'100%', 'height':'100%', 'margin':'auto'}}>
                    <CarouselSlide
                        videoComFlag ={videoComFlag}
                        slideData = {slideDatas}
                        layoutResize = {layoutResize}
                        onInformationFn = {this._infoFn}
                        showBigImgFn = {this._bigImgFn}
                        
                    />
                </div>
                <BigImg
                    bigImgUrl={imgUrl}
                    isShow={bigImgIsShow}
                    bigImgClose={this._bigImgCloseFn}
                />

                <ImgVideoAlert
                    liKeyData={alertLiData}
                    resourceData={this.alertResourceData}
                    alertCloseFn={() => this.setStateValueFn('detailAlertShow', false)}
                    alertShow={this.state.detailAlertShow}
                    // specialKeys={['sourceUrl']}
                    tagKeys={['tagList']}
                    // dealTagKeys={['tagList']}
                    // operateObj={{createTime(){console.log('create')},updateTime(){console.log('update')}}}
                />
            </Fragment>
            
        )
    }
}
export default CarouselBox

