import Navbar from '../components/Navbar'
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { Modal } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import Budget from '../components/Budget'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const BudgetPage = () => {

    // cookies (global)
    const [cookies] = useCookies(['userID'])
    const userID = cookies.userID

    // all transactions (to get actual)
    // const [data, setData] = useState([])

    // all categories
    const [categories, setCategories] = useState([])

    // category specific variables (for add/edit/delete)
    const [categoryID, setCategoryID] = useState(0)
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState(0)
    const [categoryAmount, setCategoryAmount] = useState(0)

    // handle add form
    const [showAdd, setShowAdd] = useState(false)
    const handleShowAdd = () => setShowAdd(true)
    const handleCloseAdd = () => {
        setCategoryID(0)
        setCategoryName('')
        setCategoryType(0)
        setCategoryAmount(0)
        setShowAdd(false)
    }

    // handle edit form
    const [showEdit, setShowEdit] = useState(false)
    const handleShowEdit = (id, name, type, amount) => {
        setCategoryID(id)
        setCategoryName(name)
        setCategoryType(type)
        setCategoryAmount(amount)
        setShowEdit(true)
    }
    const handleCloseEdit = () => {
        setCategoryID(0)
        setCategoryName('')
        setCategoryType(0)
        setCategoryAmount(0)
        setShowEdit(false)
    }

    // handle delete warning
    const [showDelete, setShowDelete] = useState(false)
    const handleShowDelete = (id) => {
        setCategoryID(id)
        setShowDelete(true)
    }
    const handleCloseDelete = () => {
        setCategoryID(0)
        setShowDelete(false)
    }

    // initial load of data
    useEffect(() => {
        // Axios.get(API + "/transactions/" + userID).then(json => setData(json.data))
        Axios.get(API + "/categories/" + userID).then(json => setCategories(json.data))
    }, [userID])

    // BACKEND SERVER CALLS
    const addCategory = async () => {
        try {
            const response = await Axios.post(API + '/categories/add', {
                userID: userID,
                categoryName: categoryName,
                type: categoryType,
                amount: categoryAmount
            })
            console.log(response)
            handleCloseAdd()
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const editCategory = async () => {
        try {
            const response = await Axios.put(API + "/categories/edit", {
                categoryID: categoryID,
                categoryName: categoryName,
                type: categoryType,
                amount: categoryAmount
            })
            console.log(response)
            handleCloseEdit()
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const deleteCategory = async () => {
        try {
            const response = await Axios.delete(API + '/categories/delete', {
                data: { categoryID: categoryID },
            })
            console.log(response)
            handleCloseDelete()
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }


    // loads categories into table
    const renderTable = () => {
        return categories.map((c) => (
            <tr key={c.categoryID}>
                <td>{c.categoryName}</td>
                <td>{c.typeDesc}</td>
                <td>{c.amount}</td>
                {/* <td>{categoryExpenses[c.categoryID]}</td> */}
                <td>
                    <span>
                        <BsFillTrashFill className="delete-btn" onClick={() => handleShowDelete(c.categoryID)} />
                        <BsFillPencilFill className="edit-btn" onClick={() => handleShowEdit(c.categoryID, c.categoryName, c.type, c.amount)} />
                    </span>
                </td>
            </tr>
        ))
    }

    const renderTypes = () => {
        return categories.map(c => {
            if (c.type === categoryType) {
                return ( <option value={c.type} selected>{c.typeDesc}</option> )
            } else {
                return ( <option value={c.type}>{c.typeDesc}</option> )
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">

                <Budget categories={categories} />

                <h3 className="mt-3">Budget Categories</h3>
                <button className="btn btn-success mt-3 float-right" onClick={handleShowAdd}>
                    Add Category
                </button>

                {/* Categories Table */}
                <div className="row mt-3">
                    <div className="col-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>{renderTable()}</tbody>
                        </table>
                    </div>
                </div>

                {/* Pop Up to Add Category */}
                <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <div className="col-sm">
                                <div className="col-sm">
                                    <label htmlFor="categoryName">Category Name</label>
                                    <input
                                        required="required"
                                        type="text"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        id="categoryName"
                                    ></input>
                                </div>
                            </div>

                            <div className='col-sm'>
                                <label htmlFor='type'>Category Type</label>
                                <br />
                                <select 
                                    htmlFor='type' name='type' onChange={(e) => setCategoryType(e.target.value)} id='type'>
                                    {renderTypes()}
                                </select>
                            </div>

                            <div className='col-sm'>
                                <label htmlFor='amount'>Amount</label>
                                <input
                                    required='required'
                                    type='text'
                                    className='form-control'
                                    value={categoryAmount}
                                    onChange={(e) => setCategoryAmount(e.target.value)}
                                    id='amount'
                                ></input>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success-outline" onClick={handleCloseAdd}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={addCategory}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <div className="col-sm">
                                <div className="col-sm">
                                    <label htmlFor="EditName">Category Name</label>
                                    <input
                                        required="required"
                                        type="text"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        id="EditName"
                                    ></input>
                                </div>

                                <div className='col-sm'>
                                    <label htmlFor='type'>Category Type</label>
                                    <br />
                                    <select
                                        htmlFor='type' name='type' onChange={(e) => setCategoryType(e.target.value)} id='type'>
                                        {renderTypes()}
                                    </select>
                                </div>

                                <div className='col-sm'>
                                    <label htmlFor='amount'>Amount</label>
                                    <input
                                        required='required'
                                        type='text'
                                        className='form-control'
                                        value={categoryAmount}
                                        onChange={(e) => setCategoryAmount(e.target.value)}
                                        id='amount'
                                    ></input>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success-outline" onClick={handleCloseEdit}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={editCategory}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>


                {/* Pop Up to Confirm Category Deletion */}
                <Modal
                    show={showDelete}
                    onHide={handleCloseDelete}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning-outline" onClick={handleCloseDelete}>
                            Cancel
                        </button>
                        <button className="btn btn-warning" onClick={deleteCategory}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
