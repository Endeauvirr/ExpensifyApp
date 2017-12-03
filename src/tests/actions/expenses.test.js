import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixture/expenses';

const createMockStore = configureMockStore([thunk]);

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
    const payload = expenses[2];

    const action = addExpense(payload);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
    });
  });


  test('...asynchronously to database and store', (done) => {
    const store = createMockStore({});

    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'Nice mouse',
      createdAt: 445566
    };

    store.dispatch(startAddExpense(expenseData))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });


  test('...asynchronously to database and store with default values', (done) => {
    const store = createMockStore({});

    const expenseData = {};
    const expenseDefaults = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0 
    };

    store.dispatch(startAddExpense(expenseData))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseDefaults
          }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
      });
  });
  // test('...with default values', () => {
  //   const action = addExpense();

  //   expect(action).toEqual({
  //     type: 'ADD_EXPENSE',
  //     expense: {
  //       id: expect.any(String),
  //       description: '',
  //       note: '',
  //       amount: 0,
  //       createdAt: 0
  //     }
  //   })
  // });

});
