import React , { useState, useEffect }from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Checkbox } from 'antd';
import MyMenu from '../components/menu';

import TagTree from '../pages/tagTree';
import TableList from '../pages/tableList';
import DateShow from '../pages/date';
import EchartDemo from '../pages/echart';
import MenuReset from '../pages/menu';
const { Content, Sider } = Layout;
const Aa = function(){
    const [isPlace, setIsPlace] = useState(false);//是否选中湖南所有地点
    return (
        <div>
            bbb
            {/* <Checkbox >所有湖南地点</Checkbox> */}
        </div>
    )
}
class Routers extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <MyMenu />
                        </Sider>
                        <Content style={{ padding: '10px' }}>
                            <div style={{ background: '#fff', padding: 24, height: "100%",minHeight:'750px', overflow: "auto" }}>
                                <Route exact path="/" component={TagTree} />
                                <Route path="/tablelist" component={TableList} />
                                <Route path="/dateshow" component={DateShow} />
                                <Route path="/echart" component={EchartDemo} />
                                <Route path="/menu" component={MenuReset} />
                                <Route path="/aa" component={Aa} />

                            </div>
                        </Content>
                    </Layout>
                </div>


            </Router>

        )
    }
}

export default Routers;