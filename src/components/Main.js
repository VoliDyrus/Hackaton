import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { countriesCode } from "../data/countriesData";
import GenresContext from "../contexts/GenresContext";

import LandingPage from "./LandingPage";

import "../style/LandingPage.css";

function Main() {
  const params = useParams();
  const selectedCountry = params.country;
  const { displayGenres } = useContext(GenresContext);

  const [generalEvents, setGeneralEvents] = useState([]);

  console.log("selectedCountry", selectedCountry, typeof selectedCountry);

  async function getEvents(countryCode = "Great Britain", genre = "") {
    let twoLettersCode = countriesCode.find(
      (country) => country.name === countryCode
    );
    twoLettersCode = twoLettersCode.code;
    if (twoLettersCode) {
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
          if (dataFinal) {
            setGeneralEvents((prevList) => {
              const newList = [...prevList, dataFinal];
              return newList;
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (selectedCountry && displayGenres.length > 0) {
      displayGenres.forEach((genre) => {
        getEvents(selectedCountry, genre.name);
      });
    } else if (displayGenres.length > 0) {
      displayGenres.forEach((genre) => {
        getEvents("Great Britain", genre.name);
      });
    }
  }, [displayGenres, selectedCountry]);

  return (
    <div>
      {generalEvents.length > 0 &&
        generalEvents.map((genre) => (
          <>
            {genre[0].classifications[0].genre.name}
            <LandingPage event={genre} country={selectedCountry} />
          </>
        ))}
    </div>
  );
}

export default Main;
