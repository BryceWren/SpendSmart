import React, { useState } from "react";
import "./FormComp.css";

const FormComp = ({ handleAddEvent }) => {
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleEventTitleChange = (e) => {
        setEventTitle(e.target.value);
        setErrorMsg("");
    };

    const handleEventDescriptionChange = (e) => {
        setEventDescription(e.target.value);
        setErrorMsg("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (eventTitle.trim() === "" || eventDescription.trim() === "") {
            setErrorMsg("Please enter a title and description");
            return;
        }

        handleAddEvent(eventTitle, eventDescription);
        setEventTitle("");
        setEventDescription("");
        setErrorMsg("");
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="eventTitle">Event Title:</label>
                <input
                    type="text"
                    id="eventTitle"
                    placeholder="Enter event title here"
                    value={eventTitle}
                    onChange={handleEventTitleChange}
                />
                <label htmlFor="eventDescription">Event Description:</label>
                <textarea
                    id="eventDescription"
                    placeholder="Enter description for event"
                    value={eventDescription}
                    onChange={handleEventDescriptionChange}
                ></textarea>
                <button type="submit">Add Event</button>
            </form>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
    );
};

export default FormComp;