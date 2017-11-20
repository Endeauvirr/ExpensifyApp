import React from 'react';
import moment from 'moment';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? props.expense.amount : 0,
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      formValidationError: false
    }
  }
  componentDidMount() {
    if (typeof this.props.expense !== 'undefined') {
      const { description, note, amount, createdAt } = this.props.expense;

      this.setState(() => ({
        description,
        note,
        amount: (amount / 100).toString(),
        createdAt: moment(createdAt)
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
        [formFieldName]: formFieldValue
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
          {this.state.formValidationError && <p>Please fill description and amount fields</p>}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onInput={this.onStringElementChange}
          />
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={this.state.amount}
            onFocus={this.onAmountElementFocus}
            onChange={this.onAmountElementChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onCalendarFocused}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            name="note"
            placeholder="Place a note for expense (optional)"
            onInput={this.onStringElementChange}
          />
          <button
            type="submit"
          >
            {(this.props.expense) ? 'Edit expense' : 'Create expense'}
          </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
