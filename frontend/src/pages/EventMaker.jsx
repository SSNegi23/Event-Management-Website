import { useState } from "react";
import "../styles/EventForm.css";

const EventMaker = ({ setShowModal, showModal }) => {
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
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send both text and file data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("photos", formData.photos); // Add the image file
    data.append("rules", formData.rules);
    data.append("paymentAmount", formData.paymentAmount);
    data.append("contacts", formData.contacts);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data, // Send FormData
      });

      if (response.ok) {
        const data = await response.json();
        setEvents([...events, data.event]);
        setShowModal(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to create event");
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message);
      console.error("Error:", error);
    }

    // Reset form
    setFormData({
      title: "",
      location: "",
      description: "",
      photos: null,
      rules: "",
      paymentAmount: "",
      contacts: "",
    });
  };

  // Get image URL from server
  const getImageUrl = (filename) => {
    return `http://localhost:5000/uploads/${filename}`;
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
                onChange={(e) => handleChange(e.target.files[0])}
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}

      <div>
        <h3>All Events</h3>
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h4>{event.title}</h4>
            <p>{event.location}</p>
            <p>{event.description}</p>
            {event.image && (
              <img
                src={getImageUrl(event.image)} // Use image directly
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
