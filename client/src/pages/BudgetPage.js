import React, { useState } from 'react';
import Income from '../components/Income';
import Expenses from '../components/Expenses';
import Remaining from '../components/Remaining';
import Navbar from '../components/Navbar';
import PieChartTransactions from '../components/PieChartTransactions';

export const BudgetPage = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Function to update total expenses from Expenses component
  const handleExpensesChange = (newTotalExpenses) => {
    setTotalExpenses(newTotalExpenses);
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h3 className='mt-3'>Budget</h3>

        <div className='row mt-3'>
          <div className='col-sm'>
            <Income />
          </div>
          <div className='col-sm'>
          </div>
          <div className='col-sm'>
            {/* Pass the totalExpenses state to Expenses component */}
            <Expenses totalExpenses={totalExpenses} />
          </div>
          <div className='col-sm'>
            <Remaining />
          </div>
        </div>
        <div>
          <PieChartTransactions />
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;