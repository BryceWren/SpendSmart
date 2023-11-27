import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventListComp from "../EventList/EventListComp";
import "./CalendarComp.css";
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { Modal } from "react-bootstrap";

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

const CalendarComp = () => {

    // cookies (global)
    const [cookies] = useCookies(['userID']);
    const userID = cookies.userID;

    // all events
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])

    // event specifc variables (for add form)
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState(0)
    const [desc, setDesc] = useState('')

    // variables to handle calendar
    const [selectDate, setSelectDate] = useState(new Date());
    const handleDateChange = (date) => setSelectDate(date);

    // variables to handle form
    const [showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false)
    const handleShowAdd = () => setShowAdd(true)

    useEffect(() => {
        Axios.get(API + "/calendar/all/" + userID).then(json => setData(json.data));
        Axios.get(API + "/categories/" + userID).then(json => setCategories(json.data));
    }, [userID]);


    const renderCategories = () => {
        return categories.map(c => {
            if (c.categoryID === category) {
                return ( <option value={c.categoryID} selected>{c.categoryName}</option> )
            } else {
                return ( <option value={c.categoryID}>{c.categoryName}</option> )
            }
        })
    }

    const addEvent = async () => {
        try {
            const response = await Axios.post(API + "/calendar/add", {
                userID: userID,
                date: date,
                desc: title,
                amount: amount,
                category: category,
                note: desc
            })
            console.log(response);
            window.location.reload(true)

        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const isDateWEvent = ({ date }) => {
        return data.some(
            (event) => (new Date(event.date)).toDateString() === date.toDateString()
        );
    };

    const filteredEvents = data.filter(
        (event) => (new Date(event.date)).toDateString() === selectDate.toDateString()
    );

    return (
        <div className='calendar-container'>
            <h1>Track Upcoming Expenses!</h1>
            
            <Calendar
                className="react-calendar"
                onChange={handleDateChange}
                value={selectDate}
                tileContent={({ date }) =>
                    isDateWEvent({ date }) && <div className='event-pointer'></div>
                }
            />

            <button className='btn btn-success mt-3 float-right' onClick={handleShowAdd}>Add Event</button>

            <EventListComp events={filteredEvents} categories={categories}/>

            {/* Pop Up to Add Event */}
            <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={addEvent}>
                        <div className='col-sm'>
                            <div className='col-sm'>
                                <label htmlFor='date'>Date</label>
                                <input required='required' type='date' className='form-control'
                                    value={date} onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('en-CA'))} id='date'></input>
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
                    <button className="btn btn-success-outline" onClick={handleCloseAdd}>Cancel</button>
                    <button className="btn btn-success" onClick={addEvent}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default CalendarComp;

