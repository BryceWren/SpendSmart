import Transaction from './Transaction';

const transactions = [
	//TODO: replace with call to server for user's transactions
	{ id: 1, date: '10-1-2023', vendor: 'Apartment', amount: 1000, category: 'rent' },
	{ id: 2, date: '10-2-2023', vendor: 'Exxon', amount: 35, category: 'gas' },
	{ id: 3, date: '10-2-2023', vendor: 'Publix', amount: 70, category: 'groceries' },
	{ id: 4, date: '10-5-2023', vendor: 'Amazon', amount: 40, category: 'shopping' },
	{ id: 5, date: '10-6-2023', vendor: 'Petsmart', amount: 30, category: 'pets' },
];

const TransactionList = () => {

    return (
		<table className='table'> 
			<tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Category</th>
				<th>Amount</th>
				<th />
            </tr>
			{transactions.map((t) => (
				<Transaction id={t.id} date={t.date} vendor={t.vendor} amount={t.amount} category={t.category} />
			))}
		</table>
    )
}

export default TransactionList