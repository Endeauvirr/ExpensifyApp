import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal, { getExpensesTotalCount } from '../selectors/expenses-total';
import formatPrice from '../utils/formatPrice';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = (
  {
    visibleExpenseCount,
    visibleExpensesTotal,
    expensesCount,
    expensesTotal,
  }) => {
  const expensesWord = (visibleExpenseCount === 1) ? 'expense' : 'expenses';

  return (
    <div className="expenses__summary">
      {
        visibleExpenseCount === 0 ? (
          <p className="expenses__summary--visible">You do not have any expenses in this time.</p>
        ) : (
          <p className="expenses__summary--visible">
            Showing <span>{visibleExpenseCount} {expensesWord}</span> with total value of <span>{visibleExpensesTotal}</span>
          </p>
        )
      }
      <p className="expenses__summary--overall-info">
        Overall, you have <span>{expensesCount} expenses</span> with total value of <span>{expensesTotal}</span>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  const expensesCount = getExpensesTotalCount(state.expenses);

  return {
    visibleExpenseCount: visibleExpenses.length,
    visibleExpensesTotal: formatPrice(getExpensesTotal(visibleExpenses)),
    expensesCount,
    expensesTotal: formatPrice(getExpensesTotal(state.expenses)),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
