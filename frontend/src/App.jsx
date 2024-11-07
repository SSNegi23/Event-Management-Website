import { Route, Routes , Navigate} from 'react-router-dom'
import { useState , useEffect} from 'react'
import './App.css'
import MainContainer from './components/MainContainer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Event from './pages/Event'
import SearchEvents from './pages/SearchEvents'
import MyCalendar from './pages/Calendar'
import EventMaker from './pages/EventMaker'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  console.log("App.jsx");
  const [isAuthentcated, setIsAuthenticated] = useState(false);
  

  useEffect(()=> {
    if(localStorage.getItem('token')!=null){
      setIsAuthenticated(true);
    };
  }, [])
  return (
    <div>
      <Navbar />
      <Routes>
      { isAuthentcated ? (
        <>
      <Route path='home'  element={<MainContainer />}>
        <Route path='home' element={<Home />} />
        <Route path='calendar' element={<MyCalendar />} />
        <Route path='search-event' element={<SearchEvents />} />
      </Route>
      <Route path='/' element={<SignUp />} />
      <Route path='profile' element={<Profile />} />
      <Route path='event' element={<Event />} />
      <Route path='eventmaker' element={<EventMaker />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<SignUp />}/>
      </>
      ): (
        <>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<SignUp />}/>
        <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      
      
        
      </Routes>
    </div>
  )
}

export default App
