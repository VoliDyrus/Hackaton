import React from "react";
import star from "../images/favourite.png";

function BigCard(props) {
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
        Date:{props.event.dates.start.localDate} <br />
        Time: {props.event.dates.start.localTime}
      </div>
      <p>{props.event.info}</p>
      <p>{props.event.dates.status.code}</p>
      <p>
        Tickets on sale from {props.event.sales.public.startDateTime} until{" "}
        {props.event.sales.public.endDateTime}.
      </p>
      <button>
        <a href={props.event.url}>Get your tickets!</a>
      </button>
    </div>
  );
}
export default BigCard;
