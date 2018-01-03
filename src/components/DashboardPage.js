import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilter';
import ExpensesSummary from './ExpensesSummary';

export const DashboardPage = (props) => {
  return (
    <div className="dashboard__wrapper">
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default DashboardPage;
