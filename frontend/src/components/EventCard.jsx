import "../styles/EventCard.css";

const EventCard = ({ details }) => {
  return (
    <div className="event-card-container">
      <div className="event-card-title">{details.title}</div>
      <div className="event-card-image">
        <img src={details.img} alt="" />
      </div>
      <div className="event-card-desc">
        <ul>
          <li>Description: {details.desc}</li>
          <li>Location: {details.location}</li>
          <li>Price: {details.price}</li>
          <li>Organizer: {details.organizer}</li>
        </ul>
      </div>
    </div>
  );
};

export default EventCard;
