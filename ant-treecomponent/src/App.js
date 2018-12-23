import React, { Component } from 'react';
import './App.css';
import RouteMap from './routers'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouteMap />
      </div>
    );
  }
}

export default App;
