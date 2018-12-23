import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
// function setup() {
// //   const enzymeWrapper = mount( <App /> )
// // ​
//   return {
//     enzymeWrapper
//   }
// }


// describe('components', () => {
//   describe('App', () => {
// //     it('should render self and subcomponents', () => {
// // //       const { enzymeWrapper } = setup();
// // // ​
// // //       expect(enzymeWrapper.find('div').hasClass('App')).toBe(true)
// // // ​
// // //       const TaskTagTreeList = enzymeWrapper.find('TaskTagTreeList').props()
// //       // expect(TaskTagTreeList.treeData).toBe(Array)
// //     })
// ​
//   })
// })


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
