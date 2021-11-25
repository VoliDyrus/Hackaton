import React, { useEffect, useState } from "react";
import { countriesCode } from "../data/countriesData";

import axios from "axios";

function CardDetails() {
  const [filterType, setFilterType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Great Britain");

  console.log("selectedCountry", selectedCountry);

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedCountry(e.target.elements.country.value);
  }

  async function requestApi(selectedCountry) {
    let { code } = countriesCode.find(
      (country) => country.name === selectedCountry
    );

    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=${code}&size=10&apikey=qrf4AHhPNz3OMCpLMaTadNgQxJNSHmkc`
    );
    const data = await response.data;
    console.log(data);
  }

  useEffect(() => {
    requestApi(selectedCountry);
  }, [selectedCountry]);

  return (
    <div>
      <div className="slider">
        <div className="slider-content">
          <h2 className="slider-title">
            <strong>Search By Country:</strong>
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

export default CardDetails;
