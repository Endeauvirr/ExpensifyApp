import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import formatPrice from '../utils/formatPrice';
import { Link } from 'react-router-dom';
import { startRemoveExpense } from '../actions/expenses';


export const ExpenseListItem = ({ id, description, note, amount, createdAt, dispatch }) => (
  <div className="expenses__list-item">
    <div className="expense-item__description--wrapper">
      <h3 className="expense-item__header">
        <Link to={`/edit/${id}`}>
          {description}
        </Link>
        <p className="expense-item__date">Added at: {moment(createdAt).format('DD.MM.YYYY')}</p>
      </h3>
      <p className="expense-item__note">{note}</p>
      
    </div>

    <div className="expense-item__value">
      <span>{formatPrice(amount)}</span>
    </div>

    <div className="expense-item__action">
      <button
        type="button"
        onClick={() => {
          dispatch(startRemoveExpense(id));
        }}
      >
        Remove
      </button>
    </div>
  </div>
);

export default connect()(ExpenseListItem);
