import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import formatPrice from '../utils/formatPrice';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? props.expense.amount : 0,
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      formValidationError: false,
      formattedPrice: props.expense ? props.expense.amount : 0
    }
  }
  componentDidMount() {
    if (typeof this.props.expense !== 'undefined') {
      const { description, note, amount, createdAt } = this.props.expense;

      this.setState(() => ({
        description,
        note,
        amount: (amount / 100).toString(),
        createdAt: moment(createdAt),
        formattedPrice: formatPrice(amount)
      }));
    }
  }
  onStringElementChange = (event) => {
    const formFieldName = event.target.name;
    const formFieldValue = event.target.value;

    this.setState(() => ({
      [formFieldName]: formFieldValue
    }))
  }
  onAmountElementChange = (event) => {
    const formFieldName = event.target.name;
    const formFieldValue = event.target.value.replace(',','.');

    if (!formFieldValue || formFieldValue.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        [formFieldName]: formFieldValue,
        formattedPrice: formatPrice(parseFloat(formFieldValue, 10) * 100)
      }))
    }
  }
  onAmountElementFocus = (event) => {
    const value = Number(event.target.value);

    if (value === 0) {
      this.setState(() => ({
        amount: ''
      }))
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({
        createdAt
      }));
    }
  }
  onCalendarFocused = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }))
  }
  onSubmitHandler = (event) => {
    event.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        formValidationError: true
      }));
    } else {
      this.setState(() => ({
        formValidationError: false
      }));

      const {
        description, amount, createdAt, note
      } = this.state;

      this.props.onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note
      });
    }
  }
  render() {
    return (
      <div className="expenses__create-expense--form">
        <form onSubmit={this.onSubmitHandler}>
          {this.state.formValidationError && <p className="expense-form__error-message">Please fill description and amount fields</p>}
          <div className="expense-form__input--wrapper">
            <label>Expense description</label>
            <input
              type="text"
              name="description"
              className="default-form-control"
              placeholder="Description"
              value={this.state.description}
              onChange={this.onStringElementChange}
            />
          </div>
          <div className="expense-form__input--wrapper">
            <label>Expense value - {this.state.formattedPrice}</label>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              className="default-form-control"
              value={this.state.amount}
              onFocus={this.onAmountElementFocus}
              onChange={this.onAmountElementChange}
            />
          </div>
          <div className="expense-form__input--wrapper">
            <label>Expense was made at</label>
            <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onCalendarFocused}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="expense-form__input--wrapper">
            <label>Expense details</label>
            <textarea
              name="note"
              className="default-form-control"
              placeholder="Place a note for expense (optional)"
              onInput={this.onStringElementChange}
            />
          </div>
          <div className="expense-form__input--wrapper">
            <button
              type="submit"
              className="default-form-submit"
            >
              {(this.props.expense) ? 'Edit expense' : 'Create expense'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  descripition: PropTypes.string,
  note: PropTypes.string,
  amount: PropTypes.number,
  createdAt: PropTypes.number
};

export default ExpenseForm;
