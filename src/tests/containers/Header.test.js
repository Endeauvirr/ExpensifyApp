import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../containers/Header';

// Snapshot testing , snapshoty pozwalają na badanie jak zmieniają się dane w czasie

test('Should render Header container correctly', () => {
  // ==== Using react-test-renderer

  // const renderer = new ReactShallowRenderer();

  // renderer.render(<Header />);

  // expect(renderer.getRenderOutput()).toMatchSnapshot();


  // ==== Using Enzyme

  const wrapper = shallow(<Header />);

  expect(wrapper).toMatchSnapshot();
});

