import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import "../style/Favorites.css";

import FavoriteContext from "../contexts/FavoriteContext";
import MiniCard from "./MiniCard";
import returnArrow from "../images/returnArrow.png";
import imgFavourite from "../images/img-favourite.png";

function Favorites() {
  const { favoritesList } = useContext(FavoriteContext);
  const params = useParams();
  const selectedCountry = params.country;
  return (
    <div>
      <header className="fav-header">
        <div className="container-header">
          <button className="back-button">
            <NavLink to={`/welcome/${selectedCountry}`}>
              <img src={returnArrow} alt="back-button" />
            </NavLink>
          </button>
          <div className="container-favorites">
            <p className="favorites-title">Your Favourite Events</p>
          </div>
        </div>{" "}
      </header>
      <br />
      <div className="favourite-container">
        {Object.values(favoritesList).length > 0 ? (
          <div className="row">
            {Object.values(favoritesList).map((event) => (
              <>
                <MiniCard event={event} />
              </>
            ))}
          </div>
        ) : (
          <div className="img-msg">
            <p className="favourite-msg bubble thought speech">
              Ups, you didn't save any events. Return to the last page and pick
              your favourite artists.
            </p>
            <img className="favImg" src={imgFavourite} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
