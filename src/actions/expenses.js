import uuidv1 from 'uuid';
import database from '../firebase/firebase';

// export const addExpense = ({
//   description = '',
//   note = '',
//   amount = 0,
//   createdAt = 0 
// } = {}) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuidv1(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });

const convertDataToArray = (snapshot) => {
  const expensesArray = [];

  snapshot.forEach((childSnapshot) => {
    expensesArray.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });

  return expensesArray;
};

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0 
    } = expenseData;

    const expense = {
      description,
      note,
      amount,
      createdAt
    };

    return database.ref('expenses').push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      }).catch((error) => {
        console.warn(`startAddExpense action error: ${error}`);
      });
  };
};

export const removeExpense = (id = '') => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = (id = '') => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id));
      });
  };
};

export const editExpense = (id, { ...expense } = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense: {
    ...expense
  }
});

export const startEditExpense = (id, { ...expense } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update({
      ...expense
    }).then(() => {
      dispatch(editExpense(id, { ...expense }));
    });
  };
};


// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});


// START_SET_EXPENSES (async)

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses')
      .once('value')
      .then((snapshot) => {
        const expenses = convertDataToArray(snapshot);

        dispatch(setExpenses(expenses));
      });
  };
};
