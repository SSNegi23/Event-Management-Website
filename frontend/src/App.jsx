import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < Navbar/>
      < Calendar />
      <h1 className="">App</h1>

    </>
  )
}

export default App
