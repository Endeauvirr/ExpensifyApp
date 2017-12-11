import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixture/expenses';

let startEditExpense;
let history;
let wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} history={history} expense={expenses[1]} />);
});

test('Should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});


test('Should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});
