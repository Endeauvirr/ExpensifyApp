import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <ul>
      <li>
        <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Main page</NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
      </li>
      <li>
        <button onClick={startLogout}>Log out</button>
      </li>
    </ul>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
