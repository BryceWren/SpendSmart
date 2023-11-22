import React, { useState } from 'react';

const Expenses = ({ totalExpenses }) => {

    return (
        <div className='alert alert-success'>
                <div>
                    <span>Expenses: ${totalExpenses.toFixed(2)}</span>
                </div>
        </div>
    )
}
export default Expenses;