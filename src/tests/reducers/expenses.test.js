import moment from 'moment';
import expenseReducer from '../../reducers/expenses';
import expensesDummyData from '../fixture/expenses';

test('Should set default state', () => {
  const state = expenseReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('Should set expenses', () => {
  const state = expenseReducer(expensesDummyData, {
    type: 'SET_EXPENSES',
    expenses: expensesDummyData[1]
  });

  expect(state).toEqual(expensesDummyData[1]);
});

test('Should add new expense', () => {
  const newExpense = {
    id: '4',
    description: 'Soccer',
    note: 'omg',
    amount: 134560,
    createdAt: moment().add('10', 'days').valueOf()
  };

  const state = expenseReducer(expensesDummyData, {
    type: 'ADD_EXPENSE',
    expense: newExpense
  });

  expect(state).toEqual([
    ...expensesDummyData, newExpense
  ]);
});

test('Should remove expense based on given ID', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expensesDummyData[0].id
  };
  const state = expenseReducer(expensesDummyData, action);

  expect(state).toEqual([
    expensesDummyData[1], expensesDummyData[2]
  ]);
});

test('Should not remove expense if ID is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expenseReducer(expensesDummyData, action);

  expect(state).toEqual(expensesDummyData);
});


test('Should edit expense with given ID based on given values', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expensesDummyData[0].id,
    expense: {
      description: 'Dolly'
    }
  };
  const state = expenseReducer(expensesDummyData, action);

  expect(state[0].description).toBe('Dolly');
});


test('Should not edit expense if expense ID is not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    expense: {
      description: 'Dolly'
    }
  };
  const state = expenseReducer(expensesDummyData, action);

  expect(state).toEqual(expensesDummyData);
});
