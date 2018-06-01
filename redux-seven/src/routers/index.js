import React from 'react'
import { Link, BrowserRouter, Route } from 'react-router-dom';
// import { Router, Route } from 'react-router';
import Siderbar from '../components/Siderbar/Siderbar';
import Date from '../components/Date/Date';
const Routers = () => {
    return (
      <BrowserRouter>
          <div>
              <Route path="/" component={Siderbar} />
              <Route path="/date" component={Date} />
              {/* <Route path="/inbox" component={Inbox} /> */}
          </div>  
      </BrowserRouter>
    )
};

export default Routers;
