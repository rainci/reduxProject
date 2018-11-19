import React from 'react'
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import Side from '../components/Sider';
import Bread from '../components/Breadcrumb';
import Hello from '../pages/hello';
import WrappedNormalLoginForm from '../pages/date';
// import Datesss from '../pages/date';
import Pagenations from '../pages/pagenation';

const { Content, Sider } = Layout;
const Main = () => (
    <Layout>
        <Sider>
            <Side />
        </Sider>
        <Content style={{ padding: '10px' }}>
            <Bread />
            <div style={{ background: '#fff', padding: 24, height: "100%", overflow: "auto" }}>
                <Route path='/' component={Hello} exact />
                <Route path='/main' component={Hello} exact />
                <Route path='/main/date' component={WrappedNormalLoginForm} />
                <Route path="/main/pagelist" component={Pagenations} />
            </div>
        </Content>
    </Layout>
)
export default Main;