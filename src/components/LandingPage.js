import React, { useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { countriesCode } from "../data/countriesData";
import MiniCard from "./MiniCard";
import "../style/LandingPage.css";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";
import SwiperCore, { Navigation } from "swiper";
import "swiper/modules/navigation/navigation.scss";

SwiperCore.use([Navigation]);

const LandingPage = ({ event, userName }) => {
  const params = useParams();
  const selectedCountry = params.country;

  const [error, setError] = useState(false);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const country = e.target.elements.country.value;
    console.log(country);
    const validateCountry = countriesCode.findIndex(
      (elt) => elt.name === country
    );

    console.log(validateCountry);
    if (validateCountry !== -1) {
      navigate(`/welcome/${country}`);
    } else {
      setError(true);
    }
  }

  return (
    <section className="total-container">
      <div className="container-top">
        <div className="box1">
          <span> Welcome {userName} </span>
          <span id="country-selected">{selectedCountry}</span>
          <form classname="form-style" onSubmit={handleSubmit}>
            <input
              className="input-container"
              type="text"
              placeholder="Change Country"
              name="country"
            />
            <input className="btn-container" type="submit" value="Search" />
            {error && (
              <span style={{ color: "red" }}> Country is not valid</span>
            )}
          </form>
        </div>
        <NavLink
          to={`/welcome/${selectedCountry}/favorites`}
          className="favourites-tab"
        >
          <div id="favorite" className="isFavorite">
            {" "}
          </div>
        </NavLink>
      </div>

      <div className="divbody">
        <ul className="search-ul">
          <Swiper
            className="swiper-test"
            navigation={false}
            spaceBetween={1}
            breakpoints={{
              320: { slidesPerView: 2 },
              375: { slidesPerView: 2 },
              425: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            <div className="swiper-items">
              {event &&
                event.map((event) => (
                  <SwiperSlide key={event.id}>
                    <li>
                      <MiniCard event={event} />
                    </li>
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </ul>
      </div>

      {/*   <div className="container-bottom">
        <div className="country"> search country</div>
        <div className="categories"> search category</div>
      </div> */}

      {/* <h1>hello</h1>
      <div>
        {miniList &&
          miniList.map((event) => <MiniCard key={event.id} event={event} />)}
      </div> */}
    </section>
  );
};

export default LandingPage;
