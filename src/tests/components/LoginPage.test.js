import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<LoginPage />);
});

test('Should LoginPage render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call startLogin on button click', () => { // Used with spies
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);

  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
