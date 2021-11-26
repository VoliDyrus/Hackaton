import React from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "../style/LandingPage.css";
import MiniCard from "./MiniCard";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";
import SwiperCore, { Navigation } from "swiper";
import "swiper/modules/navigation/navigation.scss";

SwiperCore.use([Navigation]);

const LandingPage = ({ event }) => {
  const params = useParams();
  const selectedCountry = params.country;
  return (
    <section className="total-container">
      <div className="container-top">
        <div className="box1">
          <h3> Welcome Vania </h3>
          <p id="country-selected">{selectedCountry}</p>
        </div>
        <NavLink to="/favorites" className="favourites-tab">
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
              375: { slidesPerView: 3 },
              480: { slidesPerView: 4 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            <div className="swiper-items">
              {event &&
                event.map((event) => (
                  <SwiperSlide>
                    <li>
                      <MiniCard key={event.id} event={event} />
                    </li>
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </ul>
      </div>

      <div className="container-bottom">
        <div className="country"> search country</div>
        <div className="categories"> search category</div>
      </div>

      {/* <h1>hello</h1>
      <div>
        {miniList &&
          miniList.map((event) => <MiniCard key={event.id} event={event} />)}
      </div> */}
    </section>
  );
};

export default LandingPage;
