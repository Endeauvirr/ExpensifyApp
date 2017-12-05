import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import { startSetExpenses, setExpenses } from './actions/expenses';

import './styles/style.scss';

import './firebase/firebase';

const store = configureStore();

const appRoot = document.getElementById('app');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, appRoot);

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, appRoot);
});
