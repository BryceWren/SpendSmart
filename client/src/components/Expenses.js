import React from 'react';


//pull from transactions

const Expenses = ({ totalExpenses }) => {
    return (
        <div className='alert alert-secondary'>
            <span>Expenses: ${totalExpenses}</span>
        </div>
    );
};


export default Expenses;