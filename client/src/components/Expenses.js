import React, { useState } from 'react';

const Expenses = ({ totalExpenses }) => {

    return (
        <div className='alert alert-success'>
                <div>
                    <span>Expenses: ${totalExpenses}</span>
                </div>
        </div>
    )
}
export default Expenses;