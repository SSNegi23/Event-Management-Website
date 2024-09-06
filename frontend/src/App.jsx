import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainContainer from './components/MainContainer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route path='/' element={<Home />} />
          <Route path='calendar' element={<Calendar />} />
        </Route>
        <Route path='profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
