import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormComp from '../FormComp/FormComp';
import EventListComp from "../EventList/EventListComp";
import "./CalendarComp.css";

const CalendarComp = () => {
    const [selectDate, setSelectDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handleDateChange = (date) => {
        setSelectDate(date);
    };

    const handleAddEvent = (title, description) => {
        const newEvent = {
            date: selectDate,
            title: title,
            description: description,
        };
        
        setEvents([...events, newEvent]);
        setShowForm(false);     // hiding form after successful submission
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const isDateWEvent = ({ date }) => {
        return events.some(
            (event) => event.date.toDateString() === date.toDateString()
        );
    };

    const filteredEvents = events.filter(
        (event) => event.date.toDateString() === selectDate.toDateString()
    );

    return (
        <div className='calendar-container'>
            <h1>Here is Your Calendar View!</h1>
            <Calendar
                className="react-calendar"
                onChange={handleDateChange}
                value={selectDate}
                tileContent={({ date }) =>
                    isDateWEvent({ date }) && <div className='event-pointer'></div>
                }
            />
            <div className='form-toggle'>
                <button onClick={toggleForm}>
                    {showForm ? "Cancel" : "Add Event"}
                </button>
            </div>
            {showForm && <FormComp handleAddEvent={handleAddEvent}/>}
            <EventListComp events={filteredEvents}/>
        </div>
    );
};
export default CalendarComp;

