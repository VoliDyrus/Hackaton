import React from "react";
import star from "../images/favourite.png";

function MiniCard(props) {
  return (
    <div>
      <img
        src={star}
        alt="star"
        width="25px"
        height="25px"
        onClick={(element) => (element.target.style.backgroundColor = "yellow")}
      ></img>
      <div className="card-name">{props.event.name}</div>
      <div className="card-image"></div>
      <img src={props.event.images[0].url} alt="" />
      <div className="card-locale">
        {props.event._embedded.venues[0].address.line1} <br />
        {props.event._embedded.venues[0].address.line2}{" "}
      </div>
      <div className="card-time">
        {props.event.dates.start.localDate} <br />
        {props.event.dates.start.localTime}
      </div>
    </div>
  );
}
export default MiniCard;
