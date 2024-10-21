import "../styles/EventCard.css";

const EventCard = ({ details }) => {
  const getImageUrl = (filename) => {
    return `http://localhost:5000/uploads/${filename}`;
  };
  return (
    <div className="event-card-container">
      <div className="event-card-title">{details.title}</div>
      <div className="event-card-image">
        <img src={getImageUrl(details.image)} alt="" />
      </div>
      <div className="event-card-desc">
        <ul>
          <li>Description: {details.description}</li>
          <li>Location: {details.location}</li>
          <li>Price: {details.paymentAmount}</li>
          <li>Organizer: {details.organizer}</li>
        </ul>
      </div>
    </div>
  );
};

export default EventCard;
