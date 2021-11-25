import React, { useEffect } from "react";
import axios from "axios";
import LandingPage from "./components/LandingPage";

function App() {
  async function testing() {
    /* get genres array for music
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ.json?apikey=qrf4AHhPNz3OMCpLMaTadNgQxJNSHmkc`
    );
    const data = await response.data;
    console.log(data);
    */
    /* events' array */
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&size=10&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.data;
    console.log(data._embedded.events);
  }

  useEffect(() => {
    testing();
  }, []);

  return <LandingPage />;
}

export default App;
