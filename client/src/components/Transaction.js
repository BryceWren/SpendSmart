import React from 'react';
import { TiDelete } from 'react-icons/ti';

const Transaction = (props) => {
	return (
		<tr>
            <td>{props.date}</td>
            <td>{props.vendor}</td>
            <td>{props.category}</td>
			<td>${props.amount}</td>
			<TiDelete size='2em' />
        </tr>
	);
};

export default Transaction;