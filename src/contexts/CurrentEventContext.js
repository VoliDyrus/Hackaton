import React, { createContext, useState } from "react";

const CurrentEventContext = createContext({
  currentEvents: [],
});

export const CurrentEventContextProvider = ({ children }) => {
  const [currentEvents, setCurrentEvents] = useState([]);

  function updateEvents(data) {
    setCurrentEvents(data);
  }

  return (
    <CurrentEventContext.Provider value={{ currentEvents, updateEvents }}>
      {children}
    </CurrentEventContext.Provider>
  );
};

export default CurrentEventContext;
