import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import FavoriteContext from "../contexts/FavoriteContext";
import CurrentEventsContext from "../contexts/CurrentEventContext";
import arrow from "../images/arrow.png";
import { useEffect } from "react/cjs/react.development";

function BigCard() {
  const params = useParams();
  const country = params.country;
  const id = params.id;

  const { currentEvents } = useContext(CurrentEventsContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const { isFavoriteList, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const currentlyFavorite = isFavoriteList(id);

  const handleClickFavorite = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    if (currentlyFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id, currentEvent);
    }
  };

  function updateInfo() {
    const current = currentEvents.find((elt) => elt.id === id);
    setCurrentEvent = current;
  }
  useEffect(() => {});
  return (
    <div>
      <button className="back-button">
        <NavLink to={`/welcome/${country}`}>
          <img src={arrow} alt="back-button" width="20px" />
        </NavLink>
      </button>
      <div
        id="favorite"
        className={isFavorite ? "isFavorite" : "notFavorite"}
        onClick={handleClickFavorite}
      ></div>

      <div className="card-name">{currentEvent.name}</div>
      <div className="card-image"></div>
      <img src={currentEvent.images[0].url} alt="" width="500" height="300" />
      <div className="card-locale">
        {currentEvent._embedded.venues[0].address.line1} <br />
        {currentEvent._embedded.venues[0].address.line2}
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
    </div>
  );
}
export default BigCard;
