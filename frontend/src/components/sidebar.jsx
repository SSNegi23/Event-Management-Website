import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebar-container'>
      <ul>
        <li><i className="fa-solid fa-plus"></i> New Item</li>
        <li onClick={() => {
          navigate('calendar');
        }}>Calendar</li>
        <li onClick={() => {
          navigate('search-event');
        }}>Upcoming Events</li>
      </ul>
    </div>
  )
}

export default Sidebar
