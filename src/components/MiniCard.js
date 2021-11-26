import React, { useState, useContext } from "react";
import "../style/MiniCard.css";
import FavoriteContext from "../contexts/FavoriteContext";

function MiniCard(props) {
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
    <div className="div-fav" key={props.event.id}>
      <div
        id="favorite"
        className={isFavorite ? "isFavorite" : "notFavorite"}
        onClick={handleClickFavorite}
      ></div>

      <img
        className="div-img"
        src={props.event.images[0].url}
        alt=""
        width="110px"
        height="90px"
      />
      <div className="card-name">{props.event.name}</div>
      <div className="card-time">
        date: {props.event.dates.start.localDate} <br />
        time: {props.event.dates.start.localTime}
      </div>
    </div>
  );
}
export default MiniCard;
