import React from 'react';
//import { TransactionPage } from '../pages/TransactionPage';

const Expenses = ({ totalExpenses }) => {
  return (
    <div className='alert alert-secondary'>
      <span>Expenses: ${totalExpenses}</span>
    </div>
  );
};

export default Expenses;
