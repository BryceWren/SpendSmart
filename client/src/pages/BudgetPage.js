import React, {useState, useEffect} from 'react';
import Income from '../components/Income';
import Expenses from '../components/Expenses';
import Remaining from '../components/Remaining';
import Navbar from '../components/Navbar';
import PieChartTransactions from "../components/PieChartTransactions";
import { TransactionPage } from './TransactionPage';

export const BudgetPage = () => {
    const[totalExpenses, setTotalExpenses] = useState(0);
    
    const handleTransactionChange = (newTotalExpenses) => {
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
            {/* Pass totalExpenses to Expenses component in BudgetPage */}
            <TransactionPage totalExpenses={totalExpenses} handleTransactionChange={handleTransactionChange} />
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
