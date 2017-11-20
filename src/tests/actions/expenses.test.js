import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup remove expense action object', () => {
  const id = '123abc';
  const action = removeExpense(id);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('Should setup edit expense action object', () => {
  const id = '123abc';
  const expense = {
    description: 'Example description',
    note: 'Example note'
  };
 
  const action = editExpense(id, { ...expense });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    expense: {
      ...expense
    }
  });
});


describe('Should setup add expense object...', () => {
  test('...with given values', () => {
    const payload = {
      description: 'New description',
      note: 'A note',
      amount: 45000,
      createdAt: 45670
    };

    const action = addExpense(payload);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...payload,
        id: expect.any(String)
      }
    });
  });

  test('...with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
      }
    })
  });

});
