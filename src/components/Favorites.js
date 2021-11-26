import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import "../style/Favorites.css";

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
            <NavLink to={`/welcome/${selectedCountry}`}></NavLink>
          </button>
          <div className="container-favorites">
            star
            <p className="favorites-title">Your saved Events:</p>
          </div>
        </div>{" "}
      </header>
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
          <h1>You don't have any saved events</h1>
        )}
      </div>
    </div>
  );
}

export default Favorites;
