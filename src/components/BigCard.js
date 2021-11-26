import React from "react";
import React, { useState, useContext } from "react";
import FavoriteContext from "../contexts/FavoriteContext";
function BigCard(props) {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const { isFavoriteList, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const currentlyFavorite = isFavoriteList(props.event.id);

  const handleClickFavorite = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
    if (currentlyFavorite) {
      removeFavorite(props.event.id);
    } else {
      addFavorite(props.event.id, props.event);
    }
  };
  return (
    <div>
      <div
        id="favorite"
        className={isFavorite ? "isFavorite" : "notFavorite"}
        onClick={handleClickFavorite}
      ></div>
      <div className="card-name">{props.event.name}</div>
      <div className="card-image"></div>
      <img src={props.event.images[0].url} alt="" width="500" height="300" />
      <div className="card-locale">
        {props.event._embedded.venues[0].address.line1} <br />
        {props.event._embedded.venues[0].address.line2}
        <br />
      </div>
      <div className="card-time">
        Date:{props.event.dates.start.localDate} <br />
        Time: {props.event.dates.start.localTime}
      </div>
      <p>{props.event.info}</p>
      <p>{props.event.dates.status.code}</p>
      <p>
        Tickets on sale from {props.event.sales.public.startDateTime} until{" "}
        {props.event.sales.public.endDateTime}.
      </p>
      <button>
        <a href={props.event.url}>Get your tickets!</a>
      </button>
    </div>
  );
}
export default BigCard;
