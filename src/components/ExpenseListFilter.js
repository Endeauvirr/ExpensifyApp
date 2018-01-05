import React from 'react';
import { connect } from 'react-redux';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import selectExpenses from '../selectors/expenses';

export class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({
      calendarFocused
    }));
  };
  onTextFilterChange = (event) => {
    this.props.setTextFilter(event.target.value);
  };
  onFilterTypeChange = (event) => {
    if (event.target.value === 'amount') {
      this.props.sortByAmount();
    } else {
      this.props.sortByDate();
    }
  };
  render() {
    return (
      <div className="expenses__list-filters">
        <input
          type="text"
          className="list-filter__text"
          value={this.props.filters.text}
          onChange={this.onTextFilterChange}
          placeholder="Filter by name"
          disabled={this.props.visibleExpenses === 0}
        />

        <select
          className="list-filter__type"
          name="expensesTypeFilter"
          id="expensesTypeFilter"
          onChange={this.onFilterTypeChange}
          disabled={this.props.visibleExpenses === 0}
        >
          <option value="date" default>by date</option>
          <option value="amount">by amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  visibleExpenses: selectExpenses(state.expenses, state.filters).length
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
