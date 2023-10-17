import Navbar from '../components/Navbar';
import Axios from 'axios'
import React, { useState, useEffect } from "react"


export const TransactionPage = () => {

    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [data, setData] = useState([])

    useEffect(() => { Axios.get("http://localhost:3001/transactions").then(json => setData(json.data)) }, [])

    const addTransaction = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/transactions", {
                userID: 999,
                date: date,
                desc: desc,
                amount: amount,
				category: category,
                note: note
            });
            console.log(response);
            window.location.reload(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const renderTable = () => {
        return data.map(t => {
          return (
            <tr key={t.transactionID}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.description}</td>
                <td>{t.category}</td> 
                <td>{t.amount}</td>
                <td>{t.note}</td> 
                {/* TODO: edit and delete functions */}
                <td><a href="/transactions">edit</a></td>
                <td><a href="/transactions">delete</a></td> 
            </tr>
          )
        })
      };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h3 className='mt-3'>Transactions</h3>

                <h5 className='mt-3'>Add Transaction</h5>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <form onSubmit={addTransaction}>
                            <div className='row'>
                                <div className='col-sm'>
                                    <label for='date'>Date</label>
                                    <input
                                        required='required'
                                        type='date'
                                        className='form-control'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        id='date'
                                    ></input>
                                </div>
                                <div className='col-sm'>
                                    <label for='desc'>Description</label>
                                    <input
                                        required='required'
                                        type='text'
                                        className='form-control'
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        id='desc'
                                    ></input>
                                </div>
                                <div className='col-sm'>
                                    <label for='amount'>Amount</label>
                                    <input
                                        required='required'
                                        type='text'
                                        className='form-control'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        id='amount'
                                    ></input>
                                </div>
                                <div className='col-sm'>
                                    <label for='category'>Category</label>
                                    <input
                                        required='required'
                                        type='text'
                                        className='form-control'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        id='category'
                                    ></input>
                                </div>
                                <div className='col-sm'>
                                    <label for='note'>Note</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        id='note'
                                    ></input>
                                </div>

                                <div className='col-sm'>
                                    <button type='submit' className='btn btn-success mt-3'>
                                        Add Transaction
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <h5 className='mt-3'>Transactions</h5>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <table className='table'> 
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Note</th>
                                    <th />
                                </tr>
                            </thead>
                            
                            <tbody>{renderTable()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}