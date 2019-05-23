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