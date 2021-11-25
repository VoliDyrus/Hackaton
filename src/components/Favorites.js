import React from "react";
import "../style/Favorites.css";
import star from "../images/favourite.png";
import arrow from "../images/arrow.png";

function Favorites() {
  return (
    <div>
      <header className="fav-header">
        <div className="container-header">
          <button className="back-button">
            <img src={arrow} alt="back-button" />
          </button>
          <div className="container-favorites">
            <img src={star} alt="star" width="20px" />
            <p className="favorites-title">Your saved Events:</p>
          </div>
        </div>{" "}
      </header>
    </div>
  );
}

export default Favorites;
