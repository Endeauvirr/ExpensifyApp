import React from 'react';
import { shallow } from 'enzyme';
import { CreateExpensePage } from '../../components/CreateExpensePage';
import expenses from '../fixture/expenses';

let addExpense;
let history;
let wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(<CreateExpensePage addExpense={addExpense} history={history} />);
});

test('Should render CreateExpensePage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});


test('Should onSubmit handle', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
