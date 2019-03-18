import React, { Component } from 'react';
import './App.css';
import RouteMap from './routers';

class Tab extends Component {
  state = {
    activeIndex: 0
  }
  render() {
    const { activeIndex } = this.state;
    const { children, ...otherProps } = this.props;
    return (
      <ul {...otherProps}>
        {
          React.Children.map(children, (child, index) => {
            const { onClick } = child.props;
            return React.cloneElement(child, {
              active: activeIndex === index,
              onClick: (e) => {
                this.setState({
                  activeIndex: index
                })
                onClick && onClick(index, child)
              },
            })
          })
        }
      </ul>
    )
  }
}

const activeStyle = {
  color: 'red'
}
class TabItem extends Component {
  render() {
    const { active, ...otherProps } = this.props;
    let props = {
      ...otherProps
    };
    active && (props.style = activeStyle)
    return (
      <li {...props}>
        {this.props.children}
      </li>
    )
  }
}



class App extends Component {
  handleClickTab = e => {
    debugger
  }
  handleClickItem = index => {
    debugger
  }
  render() {
    return (
      <div className="App">

        <Tab onClick={this.handleClickTab}>
          <TabItem
            onClick={this.handleClickItem}
            className="ronffy"
          >
            tab1
          </TabItem>
          <TabItem>tab2</TabItem>
          <TabItem>tab3</TabItem>
        </Tab>

        <RouteMap />
      </div>
    );
  }
}

export default App;
