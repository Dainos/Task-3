import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';
import Squares from './Squares'
import { exportAllDeclaration } from '@babel/types';

// configure({
//   adapter: new Adapter()
// })

// describe('Squares', () => {
//   it('passing test', () => {
//     expect(true).toBeTruthy();
//   })
// })






it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
