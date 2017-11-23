import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should ExpensesSummary component render with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should ExpensesSummary component render with single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={40000} />);
  expect(wrapper).toMatchSnapshot();
});
