import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixture/expenses';

const uid = '112233abctest';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({ id, description, note, createdAt, amount }) => {
    expensesData[id] = {
      description,
      note,
      createdAt,
      amount
    };
  });

  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => {
    done();
  });
});

test('Should setup remove expense action object', () => {
  const id = '123abc';
  const action = removeExpense(id);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('Should remove expense from database', (done) => {
  const id = 1;
  const store = createMockStore(defaultAuthState);

  store.dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });

      return database.ref(`users/${uid}expense/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test('Should edit expense on database', (done) => {
  const id = 1;
  const store = createMockStore(defaultAuthState);
  const expenseUpdate = {
    description: 'New description',
    note: 'New example note'
  };

  store.dispatch(startEditExpense(id, { ...expenseUpdate})).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      expense: {
        ...expenseUpdate
      }
    })

    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(expenseUpdate.description);
    expect(snapshot.val().note).toBe(expenseUpdate.note);
    done();
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
    const store = createMockStore(defaultAuthState);

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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });


  test('...asynchronously to database and store with default values', (done) => {
    const store = createMockStore(defaultAuthState);

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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
      });
  });
});

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from database', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
