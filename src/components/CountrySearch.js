import React, { useEffect, useState } from "react";
import { countriesCode } from "../data/countriesData";
import "../style/CardDetails.css";

import axios from "axios";

function CountrySearch() {
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
              className="search-bar"
            />
            <datalist id="country-list" onSelect={(e) => console.log(e.target)}>
              {countriesCode
                .filter((country) => country.name.startsWith(filterType))
                .map((country) => (
                  <option key={country.code} value={country.name} />
                ))}
            </datalist>
            <input type="submit" value="" className="slider-search-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CountrySearch;
