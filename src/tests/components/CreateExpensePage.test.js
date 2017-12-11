import React from 'react';
import { shallow } from 'enzyme';
import { CreateExpensePage } from '../../components/CreateExpensePage';
import expenses from '../fixture/expenses';

let startAddExpense;
let history;
let wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(<CreateExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('Should render CreateExpensePage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});


test('Should onSubmit handle', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
