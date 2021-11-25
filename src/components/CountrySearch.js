import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { countriesCode } from "../data/countriesData";
import "../style/CardDetails.css";

function CountrySearch() {
  const [filterType, setFilterType] = useState("");
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
    <div>
      <div className="slider">
        <div className="slider-content">
          <h2 className="slider-title">
            <strong>Select your Country</strong>
          </h2>
          <br />
          {(error && (
            <span style={{ color: "red" }}>Country is not valid</span>
          )) ||
            " "}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              list="country-list"
              name="country"
              id="country"
              onChange={(e) => {
                setError(false);
                console.log(e.target.value);
              }}
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
            <input type="submit" value="Search" className="slider-search-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CountrySearch;
