import React, { useState, useEffect } from 'react';
import Income from '../components/Income';
import Expenses from '../components/Expenses';
import Remaining from '../components/Remaining';
import Navbar from '../components/Navbar';
import PieChartTransactions from '../components/PieChartTransactions';

export const BudgetPage = () => {
  // State to store expenses data
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
   setExpensesData(expensesData);
  }, []); 

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
            {/* Pass expensesData as a prop to Expenses component */}
            <Expenses expenses={expensesData} />
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
