import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";

import arrow from "../images/arrow.png";
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
    <div>
      Hello Big Card
      <button className="back-button">
        <NavLink to={`/welcome/${country}`}>
          <img src={arrow} alt="back-button" width="20px" />
        </NavLink>
      </button>
      {currentEvent && (
        <>
          <div className="card-name">{currentEvent.name}</div>
          <div className="card-image"></div>
          <img
            src={currentEvent.images[0].url}
            alt=""
            width="500"
            height="300"
          />
          <div className="card-locale">
            {currentEvent._embedded.venues[0].address.line1} <br />
            {currentEvent._embedded.venues[0].address.line2 || " "}
            <br />
          </div>
          <div className="card-time">
            Date:{currentEvent.dates.start.localDate} <br />
            Time: {currentEvent.dates.start.localTime}
          </div>
          <p>{currentEvent.info}</p>
          <p>{currentEvent.dates.status.code}</p>
          <p>
            Tickets on sale from {currentEvent.sales.public.startDateTime} until{" "}
            {currentEvent.sales.public.endDateTime}.
          </p>
          <button>
            <a href={currentEvent.url}>Get your tickets!</a>
          </button>
        </>
      )}
    </div>
  );
}
export default BigCard;
