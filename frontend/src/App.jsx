import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainContainer from './components/MainContainer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Event from './pages/Event'
import SearchEvents from './pages/SearchEvents'
import MyCalendar from './pages/Calendar'
import EventMaker from './pages/EventMaker'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route path='/' element={<Home />} />
          <Route path='calendar' element={<MyCalendar />} />
          <Route path='search-event' element={<SearchEvents />} />
        </Route>
        <Route path='profile' element={<Profile />} />
        <Route path='event' element={<Event />} />
        <Route path='eventmaker' element={<EventMaker />}/>
      </Routes>
    </div>
  )
}

export default App
