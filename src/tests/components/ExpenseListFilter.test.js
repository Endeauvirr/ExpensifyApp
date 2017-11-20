import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../components/ExpenseListFilter';
import { filters, testFilters } from '../fixture/filters';

let setTextFilter;
let sortByDate;
let sortByAmount;
let setStartDate;
let setEndDate;
let wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilter 
      filters={filters} 
      setTextFilter={setTextFilter} 
      sortByDate={sortByDate} 
      sortByAmount={sortByAmount} 
      setStartDate={setStartDate} 
      setEndDate={setEndDate} 
    />
  );
});

test('Sould ExpenseListFilter component render', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Sould ExpenseListFilter component render with alternative filters', () => {
  wrapper.setProps({
    filters: testFilters
  });
  
  expect(wrapper).toMatchSnapshot();
});
