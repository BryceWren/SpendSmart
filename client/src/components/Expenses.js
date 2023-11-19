import React from 'react';

const Expenses = ({ totalExpenses }) => {
  return (
    <div className='alert alert-secondary'>
      <span>Expenses: ${totalExpenses}</span>
    </div>
  );
};

export default Expenses;
