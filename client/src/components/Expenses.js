import React from 'react';

const Expenses = ({ totalExpenses = 0 }) => {

  return (
    <div>
      <span>Expenses: ${totalExpenses.toFixed(2)} </span>
    </div>
  );
};

export default Expenses;