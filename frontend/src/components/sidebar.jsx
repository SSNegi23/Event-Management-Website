import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/EventForm.css";

const Sidebar = () => {
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

  const navigate = useNavigate();
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>New Event</h2>
            <form onSubmit={handleSubmit}>
              <div>
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
              </div>

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

              <div>
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
              </div>

              <button type="submit">Submit</button>
            </form>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="sidebar-container">
        <ul>
          <li onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-plus"></i> New Item
          </li>
          <li
            onClick={() => {
              navigate("calendar");
            }}
          >
            Calendar
          </li>
          <li
            onClick={() => {
              navigate("search-event");
            }}
          >
            Upcoming Events
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
