import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GenresContext from "../contexts/GenresContext";
import MiniCard from "./MiniCard";

import "../style/LandingPage.css";

const countriesCode = [
  { name: "Great Britain", code: "GB" },
  { name: "United Status of America", code: "US" },
];

function Main() {
  let countryName;

  const { displayGenres } = useContext(GenresContext);

  const [generalEvents, setGeneralEvents] = useState([]);

  async function getEvents(countryCode = "Great Britain", genre = "") {
    let twoLettersCode = countriesCode.find(
      (country) => country.name === countryCode
    );
    twoLettersCode = twoLettersCode.code;
    try {
      if (genre === "All") {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=${twoLettersCode}&size=10&apikey=${process.env.REACT_APP_API_KEY}`
        );
        let data = await response.data;
        data = data._embedded.events;
        setGeneralEvents([data]);
      } else {
        let genreId = displayGenres.find((elt) => elt.name === genre);
        genreId = genreId.id;
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&genreId=${genreId}&countryCode=${twoLettersCode}&size=10&apikey=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.data;
        const dataFinal = data._embedded.events;
        setGeneralEvents((prevList) => {
          const newList = [...prevList, dataFinal];
          return newList;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (countryName && displayGenres.length > 0) {
      displayGenres.forEach((genre) => {
        getEvents(countryName, genre.name);
      });
    } else if (displayGenres.length > 0) {
      displayGenres.forEach((genre) => {
        getEvents("Great Britain", genre.name);
      });
    }
  }, [displayGenres, countryName]);

  return (
    <div>
      {generalEvents.length > 4 &&
        generalEvents.map((genre) => (
          <>
            {genre.map((event) => (
              <MiniCard key={event.id} event={event} />
            ))}
            <br />
          </>
        ))}
    </div>
  );
}

export default Main;
