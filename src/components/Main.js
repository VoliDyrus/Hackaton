import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySearch from "./CountrySearch";

import { countriesCode } from "../data/countriesData";

function Main() {
  const [filterType, setFilterType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Great Britain");

  console.log("selectedCountry", selectedCountry);

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedCountry(e.target.elements.country.value);
  }

  async function requestApi(selectedCountry) {
    let countryFound = countriesCode.find(
      (country) => country.name === selectedCountry
    );

    if (countryFound) {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=${countryFound.code}&size=10&apikey=qrf4AHhPNz3OMCpLMaTadNgQxJNSHmkc`
      );
      const data = await response.data;
      console.log(data);
    } else {
      alert("Pls select valid country");
    }
  }

  useEffect(() => {
    requestApi(selectedCountry);
  }, [selectedCountry]);

  return (
    <div>
      <div className="slider">
        <div className="slider-content">
          <h2 className="slider-title">
            <strong>Select your Country</strong>
          </h2>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              list="country-list"
              name="country"
              id="country"
              onChange={(e) => console.log(e.target.value)}
              data-code="code-test"
            />
            <datalist id="country-list" onSelect={(e) => console.log(e.target)}>
              {countriesCode
                .filter((country) => country.name.startsWith(filterType))
                .map((country) => (
                  <option key={country.code} value={country.name} />
                ))}
            </datalist>
            <input type="submit" value="Search" className="slider-search-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
