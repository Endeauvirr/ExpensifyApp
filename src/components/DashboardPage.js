import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilter';
import ExpensesSummary from './ExpensesSummary';

export const DashboardPage = (props) => (
  <div className="dashboard__wrapper">
    <div className="container">
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  </div>
);


export default DashboardPage;
