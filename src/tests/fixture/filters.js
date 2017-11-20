import moment from 'moment';

const testFilters = {
  text: 'Power',
  sortBy: 'amount',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

const filters = {
  text: '',
  sortBy: 'date',
  startDate: moment(0),
  endDate: moment().add(3, 'days')
};

export { filters, testFilters };
