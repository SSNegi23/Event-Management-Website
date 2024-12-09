import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import "../styles/SearchEvents.css";

const SearchEvents = () => {
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState(details);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [visibleCards, setVisibleCards] = useState(9); // State to control visible cards

  const handleFiltersChange = (e, field) => {
    let newLocation = location;
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    let newOrganizer = organizer;

    if (field === "location") {
      newLocation = e.target.value;
      setLocation(newLocation);
    } else if (field === "minPrice") {
      newMinPrice = e.target.value;
      setMinPrice(newMinPrice);
    } else if (field === "maxPrice") {
      newMaxPrice = e.target.value;
      setMaxPrice(newMaxPrice);
    } else if (field === "organizer") {
      newOrganizer = e.target.value;
      setOrganizer(newOrganizer);
    }

    const newDetails = details.filter((item) => {
      const matchesLocation =
        newLocation === "" ||
        item.location.toLowerCase().includes(newLocation.toLowerCase());
      const matchesPrice =
        (newMinPrice === "" || item.paymentAmount >= parseInt(newMinPrice)) &&
        (newMaxPrice === "" || item.paymentAmount <= parseInt(newMaxPrice));
      const matchesOrganizer =
        newOrganizer === "" ||
        item.organizer.toLowerCase().includes(newOrganizer.toLowerCase());

      return matchesLocation && matchesPrice && matchesOrganizer;
    });

    setFilteredDetails(newDetails);
  };

  const handleLoadMore = () => {
    if (visibleCards + 9 < filteredDetails.length) {
      setVisibleCards(visibleCards + 9);
    } else {
      setVisibleCards(filteredDetails.length);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:5000/events", {
          method: "GET",
        });
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  // Use another useEffect to track changes in details
  useEffect(() => {
    setFilteredDetails(details);
  }, [details]); // Run when `details` changes

  return (
    <div className="search-events-container">
      <div className="Filters">
        <div className="Location">
          <div>Location</div>
          <div>
            <input
              type="text"
              value={location}
              onChange={(e) => handleFiltersChange(e, "location")}
              placeholder="Type location"
            />
          </div>
        </div>

        <div className="Price">
          <div>Price</div>
          <div>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => handleFiltersChange(e, "minPrice")}
              placeholder="Min Price"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => handleFiltersChange(e, "maxPrice")}
              placeholder="Max Price"
            />
          </div>
        </div>

        <div className="Organiser">
          <div>Organizer</div>
          <div>
            <input
              type="text"
              value={organizer}
              onChange={(e) => handleFiltersChange(e, "organizer")}
              placeholder="Type organizer"
            />
          </div>
        </div>
      </div>

      <div className="card-container">
        {filteredDetails.slice(0, visibleCards).map((item) => (
          <EventCard details={item} key={item._id} />
        ))}
      </div>

      {visibleCards < filteredDetails.length && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchEvents;
