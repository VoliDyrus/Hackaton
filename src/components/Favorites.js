import React from "react";
import { NavLink } from "react-router-dom";

function Favorites() {
  return (
    <div>
      <header>
        <button className="back-button">
          <NavLink to={`/events`} className="">
            {" "}
            Arrow Symbol
          </NavLink>
          <div className="favorites-symbol">
            <div>star symbol</div>
            <h2 className="favorites-title">Your saved Events:</h2>
          </div>
        </button>
      </header>
    </div>
  );
}

export default Favorites;
