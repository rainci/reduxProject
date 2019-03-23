import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import MyMenu from '../components/menu';
import menuDemo from '../pages/menuPage';
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
                                <Route exact path="/" exact component={menuDemo} />
                                <Route exact path="/menuDemo" component={menuDemo} />
                          </div>
                      </Content>
                  </Layout>
              </div>


          </Router>

      )
  }
}

export default Routers;