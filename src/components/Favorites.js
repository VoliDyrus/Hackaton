import React, { useContext } from "react";
import "../style/Favorites.css";
import arrow from "../images/arrow.png";
import FavoriteContext from "../contexts/FavoriteContext";
import MiniCard from "./MiniCard";

function Favorites() {
  const { favoritesList } = useContext(FavoriteContext);

  return (
    <div>
      <header className="fav-header">
        <div className="container-header">
          <button className="back-button">
            <img src={arrow} alt="back-button" width="20px" />
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
