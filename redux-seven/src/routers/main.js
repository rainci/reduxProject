import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Side from '../components/Sider';
import Bread from '../components/Breadcrumb';
import Hello from '../pages/hello';
import Date from '../pages/Date';


const { Header, Content, Sider } = Layout;
// const Main = () => (
//     <Layout>
//         <Sider>
//             <Side />
//         </Sider>
//         <Content style={{ padding: '10px' }}>
//             <Bread />
//             <div style={{ background: '#fff', padding: 24, height:"100%",overflow:"auto" }}>
//                 {/* <Route path='/' component={Hello} exact /> */}
//                 <Route path='/main' component={Hello} exact />
//                 <Route path='/date' component={Date} />
//                 {/* <Route path="/pagelist" component={Pagenation} />  */}
//             </div>
//         </Content>
//     </Layout>
// )
class Main extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Layout>
            <Sider>
                <Side />
            </Sider>
            <Content style={{ padding: '10px' }}>
                {/* <Bread /> */}
                <div style={{ background: '#fff', padding: 24, height:"100%",overflow:"auto" }}>
                    {/* <Route path='/' component={Hello} exact /> */}
                    <Route path='/main' component={Hello} exact />
                    <Route path='/date' component={Date} />
                    {/* <Route path="/pagelist" component={Pagenation} />  */}
                </div>
            </Content>
        </Layout>  
        )
    }
}
export default Main;