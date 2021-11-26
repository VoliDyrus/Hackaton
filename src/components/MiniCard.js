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
    <div className="div-fav mini-card-container" key={props.event.id}>
      <div
        id="favorite"
        className={isFavorite ? "isFavorite" : "notFavorite"}
        onClick={handleClickFavorite}
      ></div>
      
      <img
        src={props.event.images[0].url}
        alt=""
        width="100%"
        height="110px"
      />

      <div className="mini-card-title">{props.event.name.substring(0,18)}</div>
      <hr className="mini-card-separator" />
      <div className="mini-card-date">date: {props.event.dates.start.localDate}</div>
      <button className="mini-card-button">More Details</button>
    </div>
  );
}
export default MiniCard;
