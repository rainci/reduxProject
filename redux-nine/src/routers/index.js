import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const LogRouter = () => (
  <Router>
    <div>
      <AuthBtn />
      <ul>
        <li>
          <Link to='/public'>Public page</Link>
        </li>
        <li>
          <Link to='/protect'>Protected page</Link>
        </li>
      </ul>
      <Route path='/public' component={Public} />
      <PriviteRoute path='/protect' component={Protect} />
      <Route path='/login' component={Login} />

    </div>
  </Router>
);
const pageStore = {
  islogin: false,
  login(cb) {
    this.islogin = true;
    setTimeout(cb,100);
  },
  logout(cb) {
    this.islogin = false;
    setTimeout(cb,100);
  }
};
const Public = () => (<h2>public page</h2>);
const Protect = () => (<h2>protect page</h2>);

const AuthBtn = withRouter(
  ({ history }) => pageStore.islogin ? (
    <p>
      Welcome!
      <button onClick={() => {
        pageStore.logout(() => history.push('/'))
      }}>sign out!</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
);

class Login extends React.Component {
  constructor(prop){
    super(prop);
    this.login = this.login.bind(this);
    this.state = {
      refer: false
    }
  }
  login(){
    pageStore.login(() => {
      this.setState({refer: true});
    })
  }
  render() {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { refer } = this.state;
      if(refer){
        return <Redirect to={from} />;
      }
      return(
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <p>
            <button onClick={this.login}>login!</button>
          </p>
        </div>
      )
  }
}

const PriviteRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      pageStore.islogin ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
    )

    }
  />
);





export default LogRouter;

