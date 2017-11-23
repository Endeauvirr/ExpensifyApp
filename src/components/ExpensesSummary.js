import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total';
import formatPrice from '../utils/formatPrice';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expensesWord = (expenseCount === 1) ? 'expense' : 'expenses';

  return (
    <div>
      {
        expenseCount === 0 ? (
          <p>You do not have any expenses in this time</p>
        ) : (
          <p>Showing {expenseCount} {expensesWord} with total value of {expensesTotal } </p>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: formatPrice(getExpensesTotal(visibleExpenses))
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
