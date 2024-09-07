import "../styles/Event.css";

const Event = () => {
  return (
    <div className="event-container">
      <div className="container-I">
        <div className="title-container ">Title</div>
        <div className="details-container flex">
          <div className="photo-carousle flex-1">Images</div>
          <div className="description flex-1">Description</div>
        </div>
        <div className="button-container">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
        </div>
      </div>
      <div className="container-II flex">
        <div className="rules-guidlines">
          <p>Rules & Guidlines</p>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          </ul>
        </div>
        <div className="contact">Contact</div>
      </div>
    </div>
  );
};

export default Event;
