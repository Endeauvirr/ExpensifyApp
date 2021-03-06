import React from 'react';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class CreateExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div className="container">
        <section className="expense-form__wrapper">
          <header className="expense-form__header">
            <h2>Create a new expense</h2>
          </header>
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </section>
      </div>
    )
  }
};

// Przerabiamy ten bezstanowy komponent na jego klasowy odpowiednik by wyciagnąć metodę onSubmit jako props.
// const CreateExpensePage = (props) => (
//   <div>
//     <h1>Create a new expense</h1>
//     <ExpenseForm
//       onSubmit={(expense) => {
//         // props.dispatch(addExpense(expense));  // Zamieniamy to wywołanie, przy pomocy metody z reduxa mapDispathchToProps() , by łatwiej testować funkcję addExpense()
//         props.onSubmit(expense);
//         props.history.push('/');
//       }}
//     />
//   </div>
// );

const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(CreateExpensePage);
// metoda connect przyjmuje kilka argumentow, undefined na poczatku to argument dla mapStateToProps
