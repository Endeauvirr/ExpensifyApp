import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import { addExpense } from './actions/expenses';

import './styles/style.scss';

const store = configureStore();

store.dispatch(addExpense({ 
  description: 'Water bill',
  note: 'sooo much to pay ;(',
  amount: 444400,
  createdAt: 50000
}));


store.dispatch(addExpense({ 
  description: 'Gas bill',
  note: 'gas is sooo cool',
  amount: 3400,
  createdAt: 750000
}));

store.dispatch(addExpense({
  description: 'Power bill',
  note: 'gas is sooo cool',
  amount: 74050,
  createdAt: 33456000
}));

const appRoot = document.getElementById('app');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, appRoot);



// HOC info
// const Info = (props) => (
//   <div>
//     <h1>Info</h1>
//     <p>The info is: {props.info}</p>
//   </div>
// );

// const withAdminWarning = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       {props.isAdmin && <p>This is private info. Please dont share</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };

// const requireAuthentication = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       {props.isLogged ? (
//           <WrappedComponent {...props} />
//       ) : (
//         <p>{props.notLoggedMessage}</p>
//       )}
//     </div>
//   );
// };


// const AdminInfo = withAdminWarning(Info);

// const AuthUser = requireAuthentication(Info);
// ReactDOM.render(<AdminInfo info="There are infos" />, appRoot);

// ReactDOM.render(<AuthUser isLogged notLoggedMessage="You have to log in" info="Banger" />, appRoot);