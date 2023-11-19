import React from 'react';

const Expenses = ({ totalExpenses }) => {
  // You can use totalExpenses in this component as needed
  return (
    <div className='alert alert-secondary'>
      <span>Expenses: ${totalExpenses}</span>
    </div>
  );
};

export default Expenses;
