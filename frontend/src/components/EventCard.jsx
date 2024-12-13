import "../styles/EventCard.css";
import { useNavigate } from "react-router-dom";
import { useEventList } from "../context/EventListContext";
import { useState } from "react";

const EventCard = ({ details }) => {
  const navigate = useNavigate();
  const { addToEventList } = useEventList(); // Access the addToEventList function
  const [isAdding, setIsAdding] = useState(false);

  const handleCardClick = () => {
    navigate("/event-details", { state: details });
  };

  const handleAddToList = async () => {
    setIsAdding(true); // Set loading state
    try {
      await addToEventList(details._id); // Add the event to the list
      alert("Event added to your list successfully!"); // Success feedback
    } catch (error) {
      console.error("Failed to add event to the list:", error);
      alert("Failed to add event. Please try again.");
    } finally {
      setIsAdding(false); // Reset loading state
    }
  };

  const getImageUrl = (filename) => {
    return `http://localhost:5000/uploads/${filename}`;
  };

  return (
    <div className="event-card-container">
      <div className="event-card-title">{details.title}</div>
      <div className="event-card-image" onClick={handleCardClick}>
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
      <button
        className="bg-blue-600 w-1/2 text-xl rounded text-white"
        onClick={handleAddToList}
        disabled={isAdding} // Disable while adding
      >
        {isAdding ? "Adding..." : "Add to list"}
      </button>
    </div>
  );
};

export default EventCard;
