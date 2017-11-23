import numeral from 'numeral';
import formatPrice from '../../utils/formatPrice';
import expenses from '../fixture/expenses';

describe('Should price be formatted as...', () => {

  test('... $0.00 when value is equal 0', () => {
    const response = formatPrice(0);
    expect(response).toBe('$0.00');
  });

  test('... $5.00 when value is equal 500', () => {
    const response = formatPrice(expenses[0].amount);
    expect(response).toBe('$5.00');
  });

});
