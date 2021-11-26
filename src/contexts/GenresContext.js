import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const GenresContext = createContext({
  genres: [],
  displayGenres: [],
});

export function GenresContextProvider({ children }) {
  const [genres, setGenres] = useState([]);
  const [displayGenres, setDisplayGenres] = useState([]);

  async function getGenres() {
    try {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ.json?apikey=qrf4AHhPNz3OMCpLMaTadNgQxJNSHmkc`
      );
      const data = await response.data;
      const dataArray = await data.segment._embedded.genres;
      setGenres(dataArray);
      const newGroup = dataArray.filter(
        (genre) =>
          genre.name === "R&B" ||
          genre.name === "Hip-Hop/Rap" ||
          genre.name === "Rock" ||
          genre.name === "Metal" ||
          genre.name === "Jazz" ||
          genre.name === "Classical" ||
          genre.name === "Dance/Electronic"
      );
      newGroup.unshift({ name: "All" });
      setDisplayGenres(newGroup);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <GenresContext.Provider value={{ genres, displayGenres }}>
      {children}
    </GenresContext.Provider>
  );
}

export default GenresContext;
