import numeral from 'numeral';

export default (value) => {
  return numeral(value / 100).format('$0,0.00');
};
