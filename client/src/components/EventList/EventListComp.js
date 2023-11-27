import "./EventListComp.css";
import Axios from 'axios';
import React, { useState } from "react"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";


const EventListComp = ({ events, categories }) => {

    const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState(0)
    const [desc, setDesc] = useState('')

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (deleteID) => {
        setId(deleteID)
        setShowDelete(true)
    }

    const [showEdit, setShowEdit] = useState(false)
    const handleCloseEdit = () => setShowEdit(false)
    const handleShowEdit = (editID, editDate, editTitle, editAmt, editCat, editDesc) => {
        setId(editID)
        setDate(editDate)
        setTitle(editTitle)
        setAmount(editAmt)
        setCategory(editCat)
        setDesc(editDesc)
        setShowEdit(true)
    }

    const editEvent = async () => {
        try {
            const response = await Axios.put(API + "/calendar/edit", {
                recurringID: id,
                date: date,
                desc: title,
                amount: amount,
                category: category,
                note: desc
            })
            console.log(response)
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const deleteEvent = async (recurringID) => {
        try {
            const response = await Axios.delete(API + "/calendar/delete", {
                data: { recurringID: recurringID }
            })
            console.log(response)
            window.location.reload(true)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const renderCategories = () => {
        return categories.length > 0 ? (
        categories.map(c => {
            if (c.categoryID === category) {
                return ( <option value={c.categoryID} selected>{c.categoryName}</option> )
            } else {
                return ( <option value={c.categoryID}>{c.categoryName}</option> )
            }
        })
        ) : ( <option value={'0'} selected>No Categories Found</option> )
    }

    return (
        <div className="event-list">
            <h2>Events</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <p>
                                <strong>Title:</strong> {event.description}
                            </p>
                            <p>
                                <strong>Amount:</strong> ${event.amount}
                            </p>
                            <p>
                                <strong>Description:</strong> {event.notes}
                            </p>
                            <p>
                                <strong>Category:</strong> {event.categoryName}
                            </p>
                            <span className='align-right'>
                                <p>
                                    <BsFillPencilFill className="editEvent-btn" onClick={() => handleShowEdit(event.recurringID, new Date(event.date).toLocaleDateString('en-CA'), event.description, event.amount, event.categoryID, event.notes)} />
                                    Edit Event
                                </p>                          
                                <p>
                                    <BsFillTrashFill className="deleteEvent-btn" onClick={() => handleShowDelete(event.recurringID)} />
                                    Delete Event
                                </p>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    No events to display yet
                </p>
            )}

            {/* Pop Up to Edit Transaction */}
            <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className='col-sm'>
                            <div className='col-sm'>
                                <label htmlFor='date'>Date</label>
                                <input required='required' type='date' className='form-control'
                                    value={date} onChange={(e) => setDate(e.target.value)} id='date'></input>
                            </div>
                            <div className='col-sm'>
                                <label htmlFor='title'>Title</label>
                                <input required='required' type='text' className='form-control'
                                    value={title} onChange={(e) => setTitle(e.target.value)} id='title'></input>
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
                                <label htmlFor='desc'>Description</label>
                                <input type='text' className='form-control' value={desc}
                                    onChange={(e) => setDesc(e.target.value)} id='desc'></input>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success-outline" onClick={handleCloseEdit}>Cancel</button>
                    <button className="btn btn-success" onClick={editEvent}>Save</button>
                </Modal.Footer>
            </Modal>

            {/* Pop Up to Confirm Event Deletion */}
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deleting this event will remove it from our database. This action can not be undone.
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning-outline" onClick={handleCloseDelete}>No, Cancel</button>
                    <button className="btn btn-warning" onClick={() => deleteEvent(id)}>Yes, Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default EventListComp;