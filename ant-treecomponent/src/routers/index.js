import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import MyMenu from '../components/menu';

import TagTree from '../pages/tagTree';
import TableList from '../pages/tableList';
import DateShow from '../pages/date';
const { Content, Sider } = Layout;

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
                            </div>
                        </Content>
                    </Layout>
                </div>


            </Router>

        )
    }
}

export default Routers;