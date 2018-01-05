import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div className="expenses__list">
    <div className="expenses__list--header">
      <span className="header--label">
        Expense
      </span>
      <span className="header--label">
        Value
      </span>
      <span className="header--label">
        Action
      </span>
    </div>
    <div className="expenses__list--content">
      {
        props.expenses.length === 0 ? (
          <p className="no-expenses-label">No expenses added. Add some more!</p>
        ) : (
          props.expenses.map((expense) => {
            return (
              <ExpenseListItem key={expense.id} {...expense} />
            );
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};


export default connect(mapStateToProps)(ExpenseList);
