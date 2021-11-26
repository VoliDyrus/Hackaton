import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../style/BigCard.css";

import { useEffect } from "react/cjs/react.development";
import { countriesCode } from "../data/countriesData";

function BigCard() {
  const params = useParams();
  const country = params.country;
  const currentId = params.id;

  const [currentEvent, setCurrentEvent] = useState("");

  async function updateInfo(selectedCountry, eventId) {
    let twoLettersCode = countriesCode.find(
      (country) => country.name === selectedCountry
    );
    twoLettersCode = twoLettersCode.code;
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.data;
    setCurrentEvent(data);
  }

  useEffect(() => {
    updateInfo(country, currentId);
  }, []);

  console.log(currentEvent);
  return (
    <div className="bigCard-wrapper">
      {currentEvent && (
        <>
          <img
            src={currentEvent.images[0].url}
            alt=""
            width="500"
            height="300"
            className="bigCard-img"
          />

          {currentEvent && (
            <div className="bigCard-content">
              <button className="backish-button">
                <NavLink to={`/welcome/${country}`}>Back</NavLink>
              </button>
              <h1 className="card-name">{currentEvent.name}</h1>

              <div className="bigCard-data"></div>

              <p className="card-locale">
                <br />
                <br />
                {currentEvent._embedded.venues[0].address.line1} <br />
                {currentEvent._embedded.venues[0].address.line2 || " "}
                <br />
              </p>
              <div className="card-time">
                <b>Date</b>: {currentEvent.dates.start.localDate}
                <br />
                <br />
                Time: {currentEvent.dates.start.localTime}
                <br />
                <br />
              </div>
              <p>{currentEvent.info}</p>
              <br />
              <br />
              <p>
                Tickets on sale from {currentEvent.sales.public.startDateTime}{" "}
                until {currentEvent.sales.public.endDateTime}.
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <button className="btn-container">
                <a href={currentEvent.url}>Get your tickets!</a>
              </button>
            </div>
          )}
        </>
      )}
      {!currentEvent && <h3>Loading...</h3>}
    </div>
  );
}
export default BigCard;
