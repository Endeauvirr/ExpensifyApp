import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';
import expensesDummyData from '../fixture/expenses';

test('Should filter by text value', () => {
  const filters = {
    text: 'a',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined 
  };

  const result = getVisibleExpenses(expensesDummyData, { ...filters });

  expect(result).toEqual([
    expensesDummyData[2], expensesDummyData[1]
  ]);
});


test('Should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };

  const result = getVisibleExpenses(expensesDummyData, { ...filters });

  expect(result).toEqual([
    expensesDummyData[2], expensesDummyData[0]
  ]);
});

test('Should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };

  const result = getVisibleExpenses(expensesDummyData, { ...filters });

  expect(result).toEqual([
    expensesDummyData[0], expensesDummyData[1]
  ]);
});


test('Should expenses be sorted by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

  const result = getVisibleExpenses(expensesDummyData, { ...filters });

  expect(result).toEqual([
    expensesDummyData[2], expensesDummyData[0], expensesDummyData[1]
  ]);
});

test('Should expenses be sorted by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };

  const result = getVisibleExpenses(expensesDummyData, { ...filters });

  expect(result).toEqual([
    expensesDummyData[2], expensesDummyData[1], expensesDummyData[0]
  ]);
});
