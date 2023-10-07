import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';

export const TransactionPage = () => {
    return (
        <div className='container'>
            <h3 className='mt-3'>Transactions</h3>

            <h5 className='mt-3'>Add Transaction</h5>
            <div className='row mt-3'>
                <div className='col-sm'>
                    <AddTransaction />
                </div>
            </div>

            <h5 className='mt-3'>Transactions</h5>
            <div className='row mt-3'>
                <div className='col-sm'>
                    <TransactionList />
                </div>
            </div>
        </div>
    )
}