import React, { useEffect, useState } from "react";
import "../style/LandingPage.css";
import MiniCard from "./MiniCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";
import SwiperCore, { Navigation } from "swiper";
import "swiper/modules/navigation/navigation.scss";

SwiperCore.use([Navigation]);

const LandingPage = () => {
  const [miniList, setMiniList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&size=10&apikey=${process.env.REACT_APP_API_KEY}`
      );
      console.log(response.data._embedded.events);
      setMiniList(response.data._embedded.events);
    };
    fetchData();
  }, []);
  return (
    <section className="total-container">
      <div className="container">
        <div className="box1">
          <h3> Welcome Vania </h3>
          <p>Country </p>
        </div>
        <div className="box2"> Moon / Star </div>
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
              {miniList &&
                miniList.map((event) => (
                  <SwiperSlide>
                    <li>
                      {" "}
                      <MiniCard key={event.id} event={event} />
                    </li>
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </ul>
      </div>

      <div className="container2">
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
