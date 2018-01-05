import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixture/expenses';
import { ExpenseList } from '../../components/ExpenseList';

test('Should render ExpenseForm component', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm component with data', () => {
  const wrapper = shallow(<ExpenseForm expense={{ ...expenses[1] }} />);

  expect(wrapper).toMatchSnapshot();
});


test('[Event, submit] Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('formValidationError')).toBe(true);
  expect(wrapper).toMatchSnapshot();
});

test('[Event, input] Should set new description on input change', () => {
  const fieldName = 'description';
  const fieldValue = 'New description in test';

  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('input').at(0).simulate('change', {
    target: {
      name: fieldName,
      value: fieldValue
    }
  });

  expect(wrapper.state('description')).toBe(fieldValue);
});


test('[Event, change] Should set new amount on input change with valid amount', () => {
  const fieldName = 'amount';
  const fieldValue = '600.00';

  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('input').at(1).simulate('change', {
    target: {
      name: fieldName,
      value: fieldValue
    }
  });

  expect(wrapper.state('amount')).toBe(fieldValue);
});


test('[Event, change] Should not set new amount on input change with invalid amount', () => {
  const fieldName = 'amount';
  const fieldValue = '6000.0000';

  const wrapper = shallow(<ExpenseForm />);

  const initialAmountState = wrapper.state('amount');

  wrapper.find('input').at(1).simulate('change', {
    target: {
      name: fieldName,
      value: fieldValue
    }
  });

  expect(wrapper.state('amount')).toBe(initialAmountState);
});

test('Should call onSubmit prop for valid submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });

  expect(wrapper.state('formValidationError')).toBe(false);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt
  });
});

test('Should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});


test('Should set datepicker visible when clicked (focused)', () => {
  const wrapper = shallow(<ExpenseForm />);
  const focused = true;
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toEqual(true);
});
