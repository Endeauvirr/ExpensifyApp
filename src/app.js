import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import { startSetExpenses, setExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

import './styles/style.scss';

import { firebase } from './firebase/firebase';

const store = configureStore();

const appRoot = document.getElementById('app');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, appRoot);
    hasRendered = true;
  }
};


ReactDOM.render(<p>Loading...</p>, appRoot);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login({
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName
    }));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (window.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
