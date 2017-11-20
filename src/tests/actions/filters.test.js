import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';


describe('Should generate set object...', () => {
  test('...for start date', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: moment(0)
    });
  });

  test('...for end date', () => {
    const action = setEndDate(moment(1000));

    expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: moment(1000)
    });
  });

  test('...for text filter with given values', () => {
    const action = setTextFilter('flower');

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: 'flower'
    });
  });

  test('...for text filter with no values', () => {
    const action = setTextFilter();

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    });
  });

  test('...for sorting by expense amount', () => {
    const action = sortByAmount();

    expect(action).toEqual({
      type: 'SORT_BY_AMOUNT'
    });
  });

  test('...for sorting by expense date', () => {
    const action = sortByDate();

    expect(action).toEqual({
      type: 'SORT_BY_DATE'
    });
  });
});
