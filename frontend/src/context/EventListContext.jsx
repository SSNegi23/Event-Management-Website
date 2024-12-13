import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EventListContext = createContext();

export const EventListProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch user and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const tk = localStorage.getItem("token"); // token might not need parsing if it's a string
    if (user && user._id) {
      setUserId(user._id);
    }
    if (tk) {
      setToken(tk);
      console.log("Token from localStorage:", token);
    }
  }, []);

  useEffect(() => {
    if (userId && token) {
      const fetchEventList = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/user/${userId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          setEventList(response.data.eventList || []);
        } catch (error) {
          console.error("Error fetching event list:", error);
        }
      };
      fetchEventList();
    }
  }, [userId, token]);

  const addToEventList = async (eventId) => {
    if (!userId || !token) {
      console.error("User ID or token is missing.");
      return;
    }
  
    console.log("Adding eventId:", eventId, "UserId:", userId, "Token:", token);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/eventList/${userId}`,
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Server Response:", response.data);
      setEventList(response.data);
    } catch (error) {
      console.error("Add event error:", error.message);
    }
  };
  
  

  const removeFromEventList = async (eventId) => {
    if (userId && token) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/eventList/${userId}`,
          {
            data: { eventId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEventList(response.data);
      } catch (error) {
        console.error("Error removing event:", error);
      }
    }
  };

  return (
    <EventListContext.Provider
      value={{ eventList, addToEventList, removeFromEventList }}
    >
      {children}
    </EventListContext.Provider>
  );
};

export const useEventList = () => useContext(EventListContext);
