import React, { useEffect, useState } from "react";
import "../style/LandingPage.css";
import MiniCard from "./MiniCard";
import axios from "axios";

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
    <>
      <h1>hello</h1>
      <div>{miniList && miniList.map((event) => <MiniCard {...event} />)}</div>
    </>
  );
};

export default LandingPage;
