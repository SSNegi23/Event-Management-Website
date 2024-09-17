import React, { useState } from "react";
import "../styles/EventForm.css";

const EventMaker = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    photos: null,
    rules: "",
    paymentAmount: "",
    contacts: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setFormData({
        ...formData,
        photos: files[0], // Save the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the form data to events array
    setEvents([...events, formData]);
    // Reset the form
    setFormData({
      title: "",
      location: "",
      description: "",
      photos: null,
      rules: "",
      paymentAmount: "",
      contacts: "",
    });
    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add New Event</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>New Event</h2>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <label>Photos</label>
              <input
                type="file"
                name="photos"
                onChange={handleChange}
                accept="image/*"
                required
              />

              <label>Rules</label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
              />

              <label>Payment Amount</label>
              <input
                type="number"
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleChange}
              />

              <label>Contacts</label>
              <input
                type="text"
                name="contacts"
                value={formData.contacts}
                onChange={handleChange}
              />

              <button type="submit">Submit</button>
            </form>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <div>
        <h3>All Events</h3>
        {events.map((event, index) => (
          <div key={index}>
            <h4>{event.title}</h4>
            <p>{event.location}</p>
            <p>{event.description}</p>
            {event.photos && (
              <img
                src={URL.createObjectURL(event.photos)}
                alt="Event"
                width="100"
              />
            )}
            <p>{event.rules}</p>
            <p>Payment: {event.paymentAmount}</p>
            <p>Contacts: {event.contacts}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventMaker;
