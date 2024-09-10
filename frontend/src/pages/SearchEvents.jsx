import EventCard from "../components/EventCard";

const details = [
  {
    id:1,
    title: "Event Title",
    img: "src\\assets\\images\\logo.jpg",
    location: "Delhi",
    desc: "This is the description of the event.",
    price: 25,
    organizer: "ASD Company",
  },
  {
    id:2,
    title: "Event Title",
    img: "src\\assets\\images\\logo.jpg",
    location: "Delhi",
    desc: "This is the description of the event.",
    price: 25,
    organizer: "ASD Company",
  },
  {
    id:3,
    title: "Event Title",
    img: "src\\assets\\images\\logo.jpg",
    location: "Delhi",
    desc: "This is the description of the event.",
    price: 25,
    organizer: "ASD Company",
  },
  {
    id:4,
    title: "Event Title",
    img: "src\\assets\\images\\logo.jpg",
    location: "Delhi",
    desc: "This is the description of the event.",
    price: 25,
    organizer: "ASD Company",
  },
];

const SearchEvents = () => {
  return (
    <div className="workarea-container" style={{display: "flex"}}>
      {
        details.map((item) => (
          <EventCard details={item} key={item.id} />
        ))
      }
      {/* <img src="src\assets\images\logo.jpg" alt="" /> */}
    </div>
  );
};

export default SearchEvents;
