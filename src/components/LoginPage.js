import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => {
  return (
    <section className="login-page">
      <header className="login-page__header--wrapper">
        <h1>Expenses Manager</h1>
      </header>
      <div className="login-page__login-panel">
        <div className="login-panel__inner-wrapper">
          <h2>Login</h2>
          <p>Login to your account to manage your expenses.</p>
          <button
            className="button-primary"
            onClick={startLogin}
          >
            Authenticate me via Google
          </button>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
