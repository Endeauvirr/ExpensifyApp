import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div className="expenses__list">
    <h1>Hello im a expense list</h1>
    {
      props.expenses.length === 0 ? (
        <p>No expenses added. Add some more!</p>
      ) : (
        props.expenses.map((expense) => {
          return (
            <ExpenseListItem key={expense.id} {...expense} />
          );
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};


export default connect(mapStateToProps)(ExpenseList);
