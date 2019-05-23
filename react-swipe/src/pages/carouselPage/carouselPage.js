import React from "react";
import { Row, Col } from 'antd';
import CarouselBox from './carouselModule/carousel'
var resizeTimer;
class LayOut extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.handleResize = this.handleResize.bind(this)
    }
    componentDidMount(){
        window.addEventListener('resize', this.handleResize) //监听窗口大小改变
    }
    componentWillUnmount() { 
        window.removeEventListener('resize', this.handleResize)
        clearTimeout(resizeTimer)
    }
    componentDidUpdate(){}
    componentWillReceiveProps(nexProps){}
    handleResize(){
        console.log(111)
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(()=>{
            this.setState({
                layoutResize:new Date().valueOf()
            })
        },1000)
    }
    render(){
        let css = {background:"#00a0e9",color:"#fff"}
        let slideData = [
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
            ];
        return (
            <div className="wrap" style={{height: '80%'}}>
                <div className="reportBox" style={{margin:"12px",background:"#fff", height: '80%'}}>
                    <Row gutter={8} style={{height: '100%'}}>
                        <Col span={6} style={{height: '100%'}}><div style={{...css,height:"100%"}}>左侧</div></Col>
                        <Col span={18} style={{height: '100%'}}>
                            <Row gutter={8} style={{height: '100%'}}>
                                <Col span={16} style={{height: '100%'}}>
                                    <Row gutter={8} style={{height: '40%'}}>
                                        <Col span={12} style={{height: '100%'}}>
                                            <div style={{...css,height:"100%"}}>
                                                <CarouselBox 
                                                    slideData={slideData}
                                                    layoutResize={this.state.layoutResize}    
                                                />
                                            </div>
                                        </Col>
                                        <Col span={12} style={{height: '100%'}}><div style={{...css,height:"100%"}}>图片轮播</div></Col>
                                    </Row>
                                </Col>
                                <Col span={8} style={{height: '100%'}}>
                                    <div style={{...css,height:'100%'}}>右侧列表</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default LayOut;