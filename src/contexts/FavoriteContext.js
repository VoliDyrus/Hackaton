import React, { createContext, useState } from "react";

const FavoriteContext = createContext({});

export const FavoriteContextProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState({});

  const isFavoriteList = (eventId) => favoritesList.hasOwnProperty(eventId);

  function addFavorite(eventId, event) {
    setFavoritesList((prev) => {
      let newstate = { ...prev };
      newstate[eventId] = event;
      return newstate;
    });
  }

  function removeFavorite(eventId) {
    setFavoritesList((prev) => {
      let newstate = { ...prev };
      delete newstate[eventId];
      return newstate;
    });
  }

  return (
    <FavoriteContext.Provider
      value={{ favoritesList, isFavoriteList, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
