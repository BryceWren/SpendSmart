import React from 'react';

const Remaining = ({income}) => {

	const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
	
	const remaining = income - totalExpenses;

	return (
		<div className='alert alert-primary'>
			<span>Remaining: ${remaining.toFixed(2)}</span>
		</div>
	);
};

export default Remaining;