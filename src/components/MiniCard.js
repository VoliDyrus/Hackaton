import React from "react";

function MiniCard(props) {
  return (
    <div>
      <div className="card-name">{props.event.name}</div>
      <div className="card-image"></div>
      <img src={props.event.images[0].url} alt="" />

      <div className="card-locale">
        {props.event._embedded.venues[0].address.line1} <br />
        {props.event._embedded.venues[0].address.line2}{" "}
      </div>
    </div>
  );
}

export default MiniCard;
