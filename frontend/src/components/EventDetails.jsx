import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { state: details } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getImageUrl = (filename) => {
    return `http://localhost:5000/uploads/${filename}`;
  };
  console.log("Payment Link Filename:", details.paymentlink);
  console.log("Payment Link URL:", getImageUrl(details.paymentlink));
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="event-details-container">
      <h1 className="event-details-title">{details.title}</h1>
      <div className="event-details-main">
        <div className="left-div">
          <img
            src={getImageUrl(details.image)}
            alt="Event"
            className="event-photo"
          />
        </div>
        <div className="right-div">
          <p>{details.description}</p>
          <p>{details.location}</p>
        </div>
      </div>
      <div className="payment-link">
        <button onClick={openModal} className="payment-button">
          Make Payment
        </button>
      </div>
      <div className="event-details-secondary">
        <div className="left-div">
          <h3>Rules</h3>
          <ul>
            {details.rules
              .split(/\d+\.\s*/) // Split based on a number followed by a period and a space
              .filter((rule) => rule.trim() !== "") // Remove empty rules
              .map((rule, index) => (
                <li key={index}>{rule.trim()}</li> // Trim and render as a list item
              ))}
          </ul>
        </div>
        <div className="right-div">
          <h3>Contact</h3>
          <p>{details.contacts}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Payment Link</h2>
            {/* Ensure the correct property name is used */}
            <img
              src={getImageUrl(details.paymentlink)}
              alt="Payment Link"
              className="event-photo"
            />
            <p>
              <a
                href={getImageUrl(details.paymentlink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to make your payment
              </a>
            </p>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
