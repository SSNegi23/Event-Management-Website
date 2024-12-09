import React, { createContext, useContext, useState, useEffect } from "react";

const EventListContext = createContext();

export const EventListProvider = ({ children }) => {
  const [eventList, setEventList] = useState(() => {
    const storedList = localStorage.getItem("eventList");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("eventList", JSON.stringify(eventList));
  }, [eventList]);

  const addToEventList = (event) => {
    setEventList((prevList) => [...prevList, event]);
  };

  const removeFromEventList = (eventId) => {
    setEventList((prevList) => {
      const updatedList = prevList.filter((event) => event._id !== eventId);
      return updatedList;
    });
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
