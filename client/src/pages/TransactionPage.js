import Navbar from '../components/Navbar'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";


export const TransactionPage = () => {
    // handling Modal prior to trans deletions
    const [showDeleteM, setShowDeleteM] = useState(false);

    const handleCloseDeleteM = () => setShowDeleteM(false);
    const handleShow = () => setShowDeleteM(true);
    // end of handling Modal prior to trans deletion

    const [data, setData] = useState([])

    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [note, setNote] = useState('')

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const handleCloseAdd = () => setShowAdd(false)
    const handleShowAdd = () => setShowAdd(true)
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

    useEffect(() => { Axios.get("http://localhost:3001/transactions").then(json => setData(json.data)) }, [])

    // BACKEND SERVER CALLS
    const addTransaction = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/addtransaction", {
                userID: 999,
                date: date,
                desc: desc,
                amount: amount,
				category: category,
                note: note
            })
            console.log(response)
            window.location.reload(false)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const editTransaction = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/edittransaction", {
                transactionID: id,
                date: date,
                desc: desc,
                amount: amount,
				category: category,
                note: note
            })
            console.log(response)
            window.location.reload(false)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const deleteTransaction = async (transactionID) => {
        try {
            const response = await Axios.post("http://localhost:3001/deletetransaction", {
                transactionID: transactionID //TODO
            })
            console.log(response)
            window.location.reload(false)
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
                <td>{t.category}</td> 
                <td>{t.notes}</td> 
                <td>
                    <span>
                        <BsFillPencilFill className="edit-btn" onClick={() => handleShowEdit(t.transactionID, new Date(t.date).toLocaleDateString('en-CA'), t.description, t.amount, t.category, t.notes)} />
                        <BsFillTrashFill className="delete-btn" onClick={() => deleteTransaction(t.transactionID)} />
                    </span>
                </td>
            </tr>
          )
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
                                    <label for='date'>Date</label>
                                        <input required='required' type='date' className='form-control'
                                            value={date} onChange={(e) => setDate(e.target.value)} id='date'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='desc'>Description</label>
                                        <input required='required' type='text' className='form-control'
                                            value={desc} onChange={(e) => setDesc(e.target.value)} id='desc'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='amount'>Amount</label>
                                        <input required='required' type='text' className='form-control'
                                            value={amount} onChange={(e) => setAmount(e.target.value)} id='amount'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='category'>Category</label>
                                        <input required='required' type='text' className='form-control'
                                            value={category} onChange={(e) => setCategory(e.target.value)} id='category'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='note'>Note</label>
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
                                    <label for='date'>Date</label>
                                        <input required='required' type='date' className='form-control'
                                            value={date} onChange={(e) => setDate(e.target.value)} id='date'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='desc'>Description</label>
                                        <input required='required' type='text' className='form-control'
                                            value={desc} onChange={(e) => setDesc(e.target.value)} id='desc'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='amount'>Amount</label>
                                        <input required='required' type='text' className='form-control'
                                            value={amount} onChange={(e) => setAmount(e.target.value)} id='amount'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='category'>Category</label>
                                        <input required='required' type='text' className='form-control'
                                            value={category} onChange={(e) => setCategory(e.target.value)} id='category'></input>
                                    </div>
                                    <div className='col-sm'>
                                        <label for='note'>Note</label>
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
            </div>
        </div>
    )
}