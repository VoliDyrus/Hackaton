import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CountrySearch from "./CountrySearch";

import { countriesCode } from "../data/countriesData";
import GenresContext from "../contexts/GenresContext";
import MiniCard from "./MiniCard";

import "../style/LandingPage.css";

function Main() {
  const [filterType, setFilterType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Great Britain");
  const [userName, setUserName] = useState();
  const { displayGenres } = useContext(GenresContext);

  const [generalEvents, setGeneralEvents] = useState([]);
  console.log("selectedCountry", selectedCountry);
  function handleSubmit(e) {
    e.preventDefault();
    setSelectedCountry(e.target.elements.country.value)
    setUserName(e.target.value)
  }

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
  return (
    <div>
      <div className="slider">
        <div className="slider-content">
          <h2 className="slider-title">
            <strong>Select your Country</strong>
          </h2>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => console.log(e.target.value)}
            />           
            <input
              type="text"
              list="country-list"
              name="country"
              id="country"
              onChange={(e) => console.log(e.target.value)}
              data-code="code-test"
            />
            <datalist id="country-list" onSelect={(e) => console.log(e.target)}>
              {countriesCode
                .filter((country) => country.name.startsWith(filterType))
                .map((country) => (
                  <option key={country.code} value={country.name} />
                ))}
            </datalist>
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
