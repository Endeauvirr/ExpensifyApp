import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../containers/Header';

// Snapshot testing , snapshoty pozwalają na badanie jak zmieniają się dane w czasie

let wrapper;
let startLogout;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={() => {}} />);
});

test('Should render Header container correctly', () => {
  // ==== Using react-test-renderer

  // const renderer = new ReactShallowRenderer();

  // renderer.render(<Header />);

  // expect(renderer.getRenderOutput()).toMatchSnapshot();


  // ==== Using Enzyme
  expect(wrapper).toMatchSnapshot();
});

test('Should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);

  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
