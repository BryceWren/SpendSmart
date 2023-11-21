import React from 'react';


const Remaining = ({income, expenses}) => {

	const totalExpenses = expenses.reduce((total, expenses) => total + expenses.amount, 0);
	
	const remaining = income - totalExpenses;

	return (
		<div>
			<span>Remaining: ${remaining.toFixed(2)}</span>
		</div>
	);
};

export default Remaining;