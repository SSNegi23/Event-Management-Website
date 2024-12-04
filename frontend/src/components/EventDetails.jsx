import { useLocation } from "react-router-dom";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { state: details } = useLocation();

  const getImageUrl = (filename) => {
    return `http://localhost:5000/uploads/${filename}`;
  };

  return (
    <div className="event-details-container">
      <h1 className="event-details-title">{details.title}</h1>
      <div className="event-details-main">
        <div className="left-div">
          <img src={getImageUrl(details.image)} alt="" className="event-photo" />
        </div>
        <div className="right-div">
          <p>{details.description}</p>
          <p>{details.location}</p>
        </div>
      </div>
      <div className="payment-link">
        <a href={details.paymentLink} target="_blank" rel="noopener noreferrer">
          Make Payment
        </a>
      </div>
      <div className="event-details-secondary">
        <div className="left-div">
          <h3>Rules</h3>
          <p>{details.rules}</p>
        </div>
        <div className="right-div">
          <h3>Contact</h3>
          <p>{details.contacts}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
