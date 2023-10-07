import Income from '../components/Income';
import Expenses from '../components/Expenses';
import Remaining from '../components/Remaining';

export const BudgetPage = () => {
    return (
        <div className='container'>
            <h3 className='mt-3'>Budget</h3>

            <div className='row mt-3'>
                <div className='col-sm'>
                    <Income />
                </div>
                <div className='col-sm'>
                    <Expenses />
                </div>
                <div className='col-sm'>
                    <Remaining />
                </div>
            </div>
        </div>
    )
}