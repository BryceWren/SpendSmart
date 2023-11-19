import React from 'react';

const Expenses = ({ totalExpenses }) => {
  return (
    <div className="mt-3">
      <h4>Expenses</h4>
      <p>{`$${totalExpenses.toFixed(2)}`}</p>
    </div>
  );
};

export default Expenses;