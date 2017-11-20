import { createStore, combineReducers } from 'redux';
import uuidv1 from 'uuid';

// ACTION GENERATORS, expenses

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0 
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv1(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const editExpense = (id, { ...expense } = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense: {
    ...expense
  }
});

// ACTION GENERATORS, filters

const setTextFilter = ({ text = '' } = {}) => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
});


// Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE': {
    return [...state, action.expense];
  }
  case 'REMOVE_EXPENSE': {
    return state.filter((expense) => expense.id !== action.id);
  }
  case 'EDIT_EXPENSE': {
    return state.map((expense) => {
      if (expense.id === action.id) {
        return { ...expense, ...action.expense };
      }

      return expense;
    });
  }
  default:
    return state;
  }
};

// Filters reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
  case 'SET_TEXT_FILTER': {
    return {
      ...state,
      text: action.text
    };
  }
  case 'SORT_BY_AMOUNT': {
    return {
      ...state,
      sortBy: 'amount'
    }
  }
  case 'SORT_BY_DATE': {
    return {
      ...state,
      sortBy: 'date'
    }
  }
  case 'SET_START_DATE': {
    return {
      ...state,
      startDate: action.startDate
    };
  }
  case 'SET_END_DATE': {
    return {
      ...state,
      endDate: action.endDate
    };
  }
  default:
    return state;
  }
};

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }

    return a.amount < b.amount ? 1 : -1;
  });
}

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  console.log(visibleExpenses);
});


const expenseOne = store.dispatch(addExpense({
  description: 'hood',
  note: 'niggah',
  amount: 55500,
  createdAt: 66890
}));

const expenseTwo = store.dispatch(addExpense({
  description: 'Hood33333',
  amount: 134300,
  createdAt: 654
}));

const expenseThree = store.dispatch(addExpense({
  description: 'where Da',
  amount: 500,
  createdAt: -567
}));

// store.dispatch(editExpense(expenseTwo.expense.id, {
//   description: 'brand new description',
//   note: 'im a note'
// }));

// store.dispatch(removeExpense({ id: expenseTwo.expense.id }));

// store.dispatch(setTextFilter({ text: 'hood' }));

// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(525));
// store.dispatch(setEndDate());


const demoState = {
  expenses: [{
    id: 'as32few3qwdef',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54300,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};
