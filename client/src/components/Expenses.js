import React from 'react';

const Expenses = ({ totalExpenses = 0 }) => {
  return (
    <div className="mt-3">
      <h4>Expenses {`$${totalExpenses.toFixed(2)}`} </h4>
    </div>
  );
};

export default Expenses;