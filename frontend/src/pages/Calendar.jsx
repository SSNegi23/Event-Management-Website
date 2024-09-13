import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../styles/Calendar.css"

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Meeting',
    start: new Date(2024, 8, 15, 10, 0),
    end: new Date(2024, 8, 15, 11, 0),
  },
  {
    title: 'Conference',
    start: new Date(2024, 8, 16, 12, 0),
    end: new Date(2024, 8, 16, 14, 0),
  },
];

const MyCalendar = () => {
  return (
    <div className='calendar-container'>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
