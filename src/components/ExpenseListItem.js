import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({ id, description, note, amount, createdAt, dispatch }) => (
  <div className="expenses__list-item">
    <h3>
      <Link to={`/edit/${id}`}>
        {description}
      </Link>
    </h3>
    <p>{note}</p>
    <p>{amount} - {createdAt}</p>
    <hr/>
    <button
      type="button"
      onClick={() => {
        dispatch(removeExpense(id));
      }}
    >
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);
