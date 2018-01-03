import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ photoURL, displayName, startLogout }) => (
  <header className="loggedUser__header--wrapper">
    <div className="header--nav-section">
      <h1 className="header--logo">
        <NavLink to="/dashboard">
          Expenses Manager
        </NavLink>
      </h1>
      <ul className="header--navigation">
        <li>
          <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
        </li>
      </ul>
    </div>
    <div className="header--user-section">
      <div className="user-section__photo">
        <img src={photoURL} alt={displayName} />
      </div>
      <div className="user-section__name--wrapper">
        <p className="user-section__name--label">Logged as:</p>
        <p className="user-section__name">{displayName}</p>
      </div>
      <div className="user-section__menu">
        <button onClick={startLogout}>Log out</button>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  photoURL: state.auth.photoURL,
  displayName: state.auth.displayName
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
