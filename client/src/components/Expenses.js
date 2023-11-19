import React from 'react';

const Expenses = ({ expenses }) => {

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
		<Expenses totalExpenses />
    </div>
  );
};

export default Expenses;
