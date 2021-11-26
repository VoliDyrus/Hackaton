import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import "../style/Favorites.css";
import arrow from "../images/arrow.png";
import FavoriteContext from "../contexts/FavoriteContext";
import MiniCard from "./MiniCard";

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
              <img src={arrow} alt="back-button" width="20px" />
            </NavLink>
          </button>
          <div className="container-favorites">
            <p className="favorites-title">Your saved Events</p>
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
          <p className="favourite-msg">
            Ups, you didn't save any events. Return to the last page and pick
            your favourite choices
          </p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
