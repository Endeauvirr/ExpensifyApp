import getExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixture/expenses';

describe('Should getExpenseTotal return...', () => {

  test('...0 if empty array was passed', () => {
    const expenses = [];
    const total = getExpenseTotal(expenses);

    expect(total).toBe(0);
  });

  test('...500 when single expense with amount of 500 was passed', () => {
    const expense = [expenses[0]];
    const total = getExpenseTotal(expense);

    expect(total).toBe(500);
  });


  test('...2500 when multiple expenses were passed', () => {
    const total = getExpenseTotal(expenses);

    expect(total).toBe(2500);
  });

});
