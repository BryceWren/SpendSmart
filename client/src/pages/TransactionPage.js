import Navbar from '../components/Navbar'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import Expenses from '../components/Expenses';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const TransactionPage = ({totalExpenses, handleTransactionChange}) => {

    const [cookies] = useCookies(['userID']);
    const userID = cookies.userID;

    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])

    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState(0)
    const [note, setNote] = useState('')

    const [showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false)
    const handleShowAdd = () => setShowAdd(true)

    const [showEdit, setShowEdit] = useState(false)
    const handleCloseEdit = () => setShowEdit(false)
    const handleShowEdit = (editID, editDate, editDesc, editAmt, editCat, editNote) => {
        setId(editID)
        setDate(editDate)
        setDesc(editDesc)
        setAmount(editAmt)
        setCategory(editCat)
        setNote(editNote)
        setShowEdit(true)
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (deleteID) => {
        setId(deleteID)
        setShowDelete(true)
    }


    
    //calculate expenses for budget page
    const calculateTotalExpenses = () => {
        let totalExpenses = 0;
        data.forEach(t => {
            totalExpenses += parseFloat(t.amount);
        });
        return totalExpenses.toFixed(2);
        <Expenses totalExpenses={calculateTotalExpenses()} />
    };
    

    useEffect(() => { 
        Axios.get(API + "/transactions/" + userID).then(json => setData(json.data)) 
        Axios.get(API + "/categories/" + userID).then(json => setCategories(json.data))
    }, [userID])

    // BACKEND SERVER CALLS
    const addTransaction = async () => {
        try {
            //console.log(category)
            const response = await Axios.post(API + "/transactions/add", {
                userID: userID,
                date: date,
                desc: desc,
                amount: amount,
				category: category,
                note: note
            })
            console.log(response);

            const newTransactions = await Axios.get(API + "/transactions/" + userID).then((json) => json.data);
            setData(newTransactions);

            handleCloseAdd();
            
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const editTransaction = async () => {
        try {
            const response = await Axios.put(API + "/transactions/edit", {
                transactionID: id,
                date: date,
                desc: desc,
                amount: amount,
				category: category,
                note: note
            })
            console.log(response)
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const deleteTransaction = async (transactionID) => {
        try {
            const response = await Axios.delete(API + "/transactions/delete", {
                data: { transactionID: transactionID }
            })
            console.log(response)
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    // RENDER FRONT END
    const renderTable = () => {
        return data.map(t => {
          return (
            <tr key={t.transactionID}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td>{t.categoryName}</td> 
                <td>{t.notes}</td> 
                <td>
                    <span>
                        <BsFillPencilFill className="edit-btn" onClick={() => handleShowEdit(t.transactionID, new Date(t.date).toLocaleDateString('en-CA'), t.description, t.amount, t.categoryID, t.notes)} />
                        <BsFillTrashFill className="delete-btn" onClick={() => handleShowDelete(t.transactionID)} />
                    </span>
                </td>
            </tr>
            
          )
          
        })
    
    }

    const renderCategories = () => {
        return categories.map(c => {
            if (c.categoryID === category) {
                return ( <option value={c.categoryID} selected>{c.categoryName}</option> )
            } else {
                return ( <option value={c.categoryID}>{c.categoryName}</option> )
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                
                <h3 className='mt-3'>Transactions</h3>
                <button className='btn btn-success mt-3 float-right' onClick={handleShowAdd}>Add Transaction</button>
                
                {/* Transaction Table */}
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <table className='table'> 
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Note</th>
                                    <th />
                                </tr>
                            </thead>
                            
                            <tbody>{renderTable()}</tbody>
                        </table>
                    </div>
                </div>


                {/* Pop Up to Add Transaction */}
                <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <form onSubmit={addTransaction}>
                            <div className='col-sm'>
                                <div className='col-sm'>
                                    <label htmlFor='date'>Date</label>
                                        <input required='required' type='date' className='form-control'
                                            value={date} onChange={(e) => setDate(e.target.value)} id='date'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='desc'>Description</label>
                                        <input required='required' type='text' className='form-control'
                                            value={desc} onChange={(e) => setDesc(e.target.value)} id='desc'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='amount'>Amount</label>
                                        <input required='required' type='text' className='form-control'
                                            value={amount} onChange={(e) => setAmount(e.target.value)} id='amount'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='category'>Category</label>
                                        <br />
                                        <select htmlFor='category' name='category' onChange={(e) => setCategory(e.target.value)} id='category'>
                                            {renderCategories()}
                                        </select>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='note'>Note</label>
                                        <input type='text' className='form-control' value={note}
                                            onChange={(e) => setNote(e.target.value)} id='note'></input>
                                    </div>
                                </div>
                            </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success-outline" onClick={handleCloseAdd}>Cancel</button>
                        <button className="btn btn-success" onClick={addTransaction}>Save</button>
                    </Modal.Footer>
                </Modal>

                {/* Pop Up to Edit Transaction */}
                <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <form onSubmit={editTransaction}>
                            <div className='col-sm'>
                                <div className='col-sm'>
                                    <label htmlFor='date'>Date</label>
                                        <input required='required' type='date' className='form-control'
                                            value={date} onChange={(e) => setDate(e.target.value)} id='date'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='desc'>Description</label>
                                        <input required='required' type='text' className='form-control'
                                            value={desc} onChange={(e) => setDesc(e.target.value)} id='desc'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='amount'>Amount</label>
                                        <input required='required' type='text' className='form-control'
                                            value={amount} onChange={(e) => setAmount(e.target.value)} id='amount'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='category'>Category</label>
                                        <br />
                                        <select htmlFor='category' name='category' onChange={(e) => setCategory(e.target.value)} id='category'>
                                            {renderCategories()}
                                        </select>
                                    </div>
                                    <div className='col-sm'>
                                        <label htmlFor='note'>Note</label>
                                        <input type='text' className='form-control' value={note}
                                            onChange={(e) => setNote(e.target.value)} id='note'></input>
                                    </div>
                                </div>
                            </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success-outline" onClick={handleCloseEdit}>Cancel</button>
                        <button className="btn btn-success" onClick={editTransaction}>Save</button>
                    </Modal.Footer>
                </Modal> 

                {/* Pop Up to Confirm Transaction Deletion */}
                <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting Transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Deleting this transaction will remove it from our database. This action can not be undone.
                    </Modal.Body>


                    <Modal.Footer>
                        <button className="btn btn-warning-outline" onClick={handleCloseDelete}>No, Cancel</button>
                        <button className="btn btn-warning" onClick={() => deleteTransaction(id)}>Yes, Delete</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}