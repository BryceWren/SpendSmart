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

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');

// placeholder to see if functional
    // const handleDateChange = (date) => {
    //     setSelectDate(date);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(
    //             "https://jsonplaceholder.typicode.com/posts?_limit=7"
    //         );

    //         const datas = await response.json();

    //         const transformedEvents = datas.map(({ title, body: description }) => {
    //             const generatedRandomDate = new Date(`
    //                 ${new Date().toLocaleDateString("en-US", {month: "short"})}
    //                 ${Math.floor(Math.random() * 28) + 1}
    //                 ${new Date().getFullYear()}
    //                 ${new Date().toTimeString()}
    //             `);
    //             return {
    //                 date: generatedRandomDate,
    //                 title,
    //                 description
    //             };
    //         });
            
    //         setEvents(transformedEvents);
    //     } catch (error) {
    //         console.error("API fetch error:", error);
    //     }
    // };

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

