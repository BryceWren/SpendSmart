import React from "react";
import "./EventListComp.css";

const EventListComp = ({ events }) => {
    return(
        <div className="event-list">
            <h2>Events</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <p>
                                <strong>Date:</strong> {event.date.toLocaleDataString()}
                            </p>
                            <p>
                                <strong>Title:</strong> {event.title}
                            </p>
                            <p>
                                <strong>Description:</strong> {event.description}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    No events to display yet
                </p>
            )}
        </div>
    )
}
export default EventListComp;