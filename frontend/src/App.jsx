import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Event from "./pages/Event";
import SearchEvents from "./pages/SearchEvents";
import MyCalendar from "./pages/Calendar";
import EventMaker from "./pages/EventMaker";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventDetails from "./components/EventDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists
    setIsLoading(false); // Authentication check complete
  }, []);

  if (isLoading) {
    // Display a loading spinner or message while authentication is checked
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContainer />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="search-event" element={<SearchEvents />} />
        </Route>
        {/* Individual routes */}
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventmaker" element={<EventMaker />} />
        {/* Redirect to home if user is already logged in */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Fallback wildcard route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
