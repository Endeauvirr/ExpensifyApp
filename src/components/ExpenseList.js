import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import { sortByValueAscending, sortByValueDescending } from '../actions/filters';

export const ExpenseList = (props) => (
  <div className="expenses__list">
    <div className="expenses__list--header">
      <span className="header--label">
        Expense
      </span>
      <button
        className="header--label with-indicator"
        onClick={() => {
          if (props.sortBy === 'value_ascending') {
            props.sortByValueDescending();
          } else {
            props.sortByValueAscending();
          }
        }}
      >
        Value
        <span
          className={`value-indicator ${props.sortBy}`}
        >
        </span>
      </button>
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
    expenses: selectExpenses(state.expenses, state.filters),
    sortBy: state.filters.sortBy
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByValueAscending: () => dispatch(sortByValueAscending()),
    sortByValueDescending: () => dispatch(sortByValueDescending())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
