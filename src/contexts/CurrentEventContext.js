import React, { createContext, useState } from "react";

const CurrentEventsContext = createContext({
  currentEvents: [],
});

export const CurrentEventsContextProvider = ({ children }) => {
  const [currentEvents, setCurrentEvents] = useState("");

  function updateEvents(data) {
    setCurrentEvents(data);
  }

  return (
    <CurrentEventsContext.Provider value={{ currentEvents, updateEvents }}>
      {children}
    </CurrentEventsContext.Provider>
  );
};

export default CurrentEventsContext;
