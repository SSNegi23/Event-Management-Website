import React from "react";
import { useEventList } from "../context/EventListContext";

const List = () => {
  const { eventList, removeFromEventList } = useEventList();

  const handleRemove = (eventId) => {
    removeFromEventList(eventId);
  };

  return (
    <div>
      <h2>My Event List</h2>
      {eventList.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul>
          {eventList.map((event) => (
            <li key={event._id} className="event-list-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Location: {event.location}</p>
              <p>Price: {event.paymentAmount}</p>
              <button
                onClick={() => handleRemove(event._id)} // Pass the unique id
                className="remove-button bg-red-500 text-white rounded px-2 py-1"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
