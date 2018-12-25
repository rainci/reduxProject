import React from "react";
import { Row,Col} from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

//容量信息
const nameArr_1 = ["视频","图片"]
const allArr_1 = [
    {
        'name':'视频',
        'value':'501.3'
    },
    {
        'name':'图片',
        'value':'11.7'
    },
]
class EchartDemo extends React.Component{
    setChartpie = (nameArr, allArr,dom,{title}) => {
        // 基于准备好的dom，初始化echarts实例   圆环形状
        var myChart = echarts.init(dom);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: {
                text: title
            },
            color:["#B676FF","#4780FF","#6AE0A9","#aa0011","#478055","#a8db00","#ff8518"],
            legend: {
                show: true,
                orient: 'vertical',
                x: 'left',
                y: '50px',
                data: nameArr
            },
            calculable: true,
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['50%', '50%'],    // 默认全局居中
                    radius: ['50%', '70%'], //radius: "55%",饼
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    fontSize: '16'
                                },
                                formatter:"{b}\n{c} | {d}%"
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    data: allArr
                }
            ]
        });
    }
    componentDidMount(){
        this.setChartpie(nameArr_1, allArr_1,this.refs.chart_1,{title:"容量信息(单位:TB)"})
    }
    render(){
        return (
            <div style={{ background: '#fff', padding: 24, height:"100%",overflow:"auto",minWidth:"1280px" }}>
                <Row>
                    <Col span={12}>
                        <div className="chartBox" id="chart_1" ref="chart_1">11</div>
                    </Col>
                    <Col span={12}>
                        <div className="chartBox" id="chart_2" ref="chart_2">22</div>
                    </Col>
                </Row>
            </div>

        )
    }
}
export default EchartDemo