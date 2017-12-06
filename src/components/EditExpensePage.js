import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
};

// const EditExpensePage = (props) => {
//   console.log(props);

//   return (
//     <div>
//       This is from edit expense page. Im editing the page with ID of {props.match.params.id}

//       <ExpenseForm
//         expense={props.expense}
//         onSubmit={(expense) => {
//           props.dispatch(editExpense(props.match.params.id, expense));
//           props.history.push('/');
//         }}
//       />
//     </div>
//   );
// };

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
