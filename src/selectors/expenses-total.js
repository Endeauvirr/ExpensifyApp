const getExpensesTotal = (expenses) => {
  if (typeof expenses !== 'object' || expenses.length === 0) {
    return 0;
  }

  return expenses
    .map((expense) => expense.amount)
    .reduce((prevValue, currentValue) => prevValue + currentValue, 0);
};

const getExpensesTotalCount = (expenses) => {
  if (typeof expenses !== 'object' || expenses.length === 0) {
    return 0;
  }

  return expenses.length;
};

export { getExpensesTotalCount, getExpensesTotal as default };
