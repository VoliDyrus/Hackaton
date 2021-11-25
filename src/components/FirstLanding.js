import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { countriesCode } from "../data/countriesData";

function Landing() {
  const [filterType, setFilterType] = useState("");
  const [error, setError] = useState(false);

  const [userName, setUserName] = useState();

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
      setUserName(e.target.value);
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => console.log(e.target.value)}
            />
            <br />
            <input
              type="text"
              list="country-list"
              name="country"
              id="country"
              onChange={(e) => setFilterType(e.target.value)}
              data-code="code-test"
            />
            <datalist id="country-list" onSelect={(e) => console.log(e.target)}>
              {countriesCode
                .filter((country) => country.name.startsWith(filterType))
                .map((country) => (
                  <option key={country.code} value={country.name} />
                ))}
            </datalist>
            <br />
            {error && (
              <span style={{ color: "red" }}>Country is not valid</span>
            )}
            <br />
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
