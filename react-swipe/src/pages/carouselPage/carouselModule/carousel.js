/**
 * 
 * @param {Array} slideData slide数据
 * @param {String} layoutResize 通过接收此值，是否从新计算内部轮播高度
 * @return {component} CarouselBox 
 * @author rainci(刘雨熙)
 * @time 2019.5.23
 */
import React, {PureComponent, Fragment} from 'react';
import CarouselSlide from '../../../components/carousel'
import BigImg from '../../../components/bigImg/bigImg'
import ImgVideoAlert from '../../../components/imgVideoAlert';
import PropTypes from 'prop-types';
import { alertLiData } from './viewVariable';
import {tool, timeTransform} from '../../../utils'
const carouselPageStyle = {'width':'100%', 'height':'100%', 'margin':'auto'};
class CarouselBox extends PureComponent {
    state = {
        bigImgIsShow: false,
    }
    // 声明Context对象属性
    static childContextTypes = {
        videoComFlag: PropTypes.bool
    }
    // 返回Context对象，方法名是约定好的
    getChildContext() {
        return {
            videoComFlag: this.props.videoComFlag,
        }
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
    _transformNum = (num) => {//处理百分比数据
        let newNum = (parseInt(num*10000)/100).toFixed(2) + '%';
        return newNum
    }
    _dealTagData = (tagList=[],tags=[]) => {//处理tagList数据
        let _this = this;
        if(!tagList.length) return [];
        tagList.map(obj => {
            obj.splice(0,1); 
            if(!tags.length) return obj;
            let last = [...obj].pop();
            for(var i=0; i < tags.length; i++){
                let { tagId, tagStatus, confidence } = tags[i];
                if(tagId == (last && last.tagId)){
                    return obj.push({
                        tagId:Math.random(),
                        name:tagStatus == "ai" ? "[" + _this._transformNum(confidence) + "]" : "[人工纠偏]"
                    });    
                }
            }
            return obj;
        })
        return tagList;
   
    }
    _dealSlideDataFn = (slideData=[]) => {//处理slide 数据源
        let _this = this;
        slideData && slideData.length && slideData.map( item => {
            // debugger
            let { duration, tagList, tags, heatValue } = item;
            item.duration = duration && timeTransform(duration);
            item.heatValue = heatValue && tool.unitConvert(heatValue);
            item.tagList = _this._dealTagData(tagList,tags);
        })
        return slideData;
    }
    componentWillReceiveProps(nextProps){
        const { slideData } = nextProps;
        let slideDatas = this._dealSlideDataFn([...slideData]);
        this.slideData = slideDatas
    }
    render() {
        let { imgUrl, bigImgIsShow } = this.state;   
        return(
            <Fragment>
                <div className='carouselPage' style={carouselPageStyle}>
                    <CarouselSlide
                        slideData = {this.slideData}
                        layoutResize = {this.props.layoutResize}
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

