//import { v4 as uuidv4 } from 'uuid';

const AddTransaction = () => {
	const onSubmit = (event) => {
        
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='row'>
                <div className='col-sm'>
					<label for='date'>Date</label>
					<input
						required='required'
						type='date'
						className='form-control'
						id='date'
					></input>
				</div>
                <div className='col-sm'>
					<label for='vendor'>Vendor</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='vendor'
					></input>
				</div>
				<div className='col-sm'>
					<label for='amount'>Amount</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='amount'
					></input>
				</div>
                <div className='col-sm'>
					<label for='category'>Category</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='category'
					></input>
				</div>

				<div className='col-sm'>
					<button type='submit' className='btn btn-success mt-3'>
						Add Transaction
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddTransaction;