import React, {PureComponent, Fragment} from 'react';
import CarouselSlide from '../../../components/carousel'
import BigImg from '../../../components/bigImg/bigImg'
import ImgVideoAlert from '../../../components/imgVideoAlert';
import { alertLiData } from './viewVariable';
class CarouselBox extends PureComponent {
    state = {
        bigImgIsShow: false,

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
    render() {
        let { slideData = [
            { title: 'slide1 介绍slide1 介绍slide1 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: '', duration: '1200000', heatValue: 12,
            "tagList": [
				[{
					"tagId": 2,
					"name": "分拣系统标签树",

				}, {
					"tagId": 10118,
					"name": "住房城建",
				}]
            ],
            "tags": [{
				"tagId": 10118,
				"name": "住房城建",
				"tagStatus": "person",
			}],
            },
            { title: 'slide2 介绍slide2 介绍slide2 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558514629952&di=117f807be378fbcf191a817c6bc46499&imgtype=0&src=http%3A%2F%2Fpic21.nipic.com%2F20120510%2F7336507_204436122000_2.jpg', duration: '2:10:23', heatValue: 12 },
            { title: 'slide3 介绍slide3 介绍slide3 介绍', publishTime: '2019.5.20', sourceName: '腾讯', author: '熙世界', sourceUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558514907022&di=644b6c3a654e4d8157c65ffcbc9ed259&imgtype=0&src=http%3A%2F%2Fimgtianqi.eastday.com%2Fres%2Fupload%2Fue%2Fimage%2F20180610%2F1528632250128910.jpeg', duration: '2:10:23', heatValue: 12 },
            ] } = this.props;
        let { imgUrl, bigImgIsShow } = this.state;   
        slideData.map( item => {
            let { duration } = item;
            item.duration = duration && this._timeTransform(duration)
            if(item.tagList && item.tagList.length>0){
                item.tagList.map((obj,i)=>{
                    obj.splice(0,1); 
                    if(item.tags){
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
        return(
            <Fragment>
                <div className='carouselPage' style={{'width':'100%', 'height':'100%', 'margin':'auto'}}>
                    <CarouselSlide
                        videoComFlag ={false}
                        slideData = {slideData}
                        onInformationFn = {this._infoFn}
                        showBigImgFn = {this._bigImgFn}
                        layoutResize = {this.props.layoutResize}
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

