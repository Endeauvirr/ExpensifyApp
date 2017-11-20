import moment from 'moment';
import filterReducer from '../../reducers/filters';


test('Should setup default filter values on initialize', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sortBy to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sortBy).toBe('amount');
});


test('Should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };

  const state = filterReducer(currentState, { type: 'SORT_BY_DATE' });

  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const state = filterReducer(undefined, { 
    type: 'SET_TEXT_FILTER',
    text: 'passed text via action'
  });

  expect(state.text).toBe('passed text via action');
});

test('Should set filter by date with given startDate', () => {
  const state = filterReducer(undefined, {
    type: 'SET_START_DATE',
    startDate: moment(0).valueOf()
  });

  expect(state.startDate).toBe(moment(0).valueOf());
});


test('Should set filter by date with given endDate', () => {
  const state = filterReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment(0).valueOf()
  });

  expect(state.endDate).toBe(moment(0).valueOf());
});
