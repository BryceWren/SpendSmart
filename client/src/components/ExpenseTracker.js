import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TransactionPage from './TransactionPage';
import Expenses from './Expenses';
import BudgetPage from './BudgetPage';
import Axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const ExpenseTracker = ({ userID }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Fetch and calculate total expenses
    Axios.get(API + "/transactions/" + userID)
      .then(json => {
        const expenses = json.data.reduce((total, transaction) => {
          return total + parseFloat(transaction.amount);
        }, 0);
        setTotalExpenses(expenses.toFixed(2));
      })
      .catch(error => console.error('An error occurred:', error));
  }, [userID]);

  return (
    <div>
      <Navbar />
      <div className='container'>
        {/* Pass totalExpenses to both TransactionPage and Expenses */}
        <TransactionPage totalExpenses={totalExpenses} />
        <Expenses totalExpenses={totalExpenses} />
        <BudgetPage totalExpenses={totalExpenses} />
      </div>
    </div>
  );
};

export default ExpenseTracker;


