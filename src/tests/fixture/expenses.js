import moment from 'moment';

export default [{
  id: '1',
  description: 'Gum',
  note: 'Just simple note',
  amount: 500,
  createdAt: 0
}, {
  id: '2',
  description: 'Ball',
  note: 'Just simple note 2',
  amount: 750,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Magazine',
  note: 'Just simple note 3',
  amount: 1250,
  createdAt: moment(0).add(4, 'days').valueOf()
}];
