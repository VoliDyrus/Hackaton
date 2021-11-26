import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countriesCode } from "../data/countriesData";
import "../style/LandingPage.css";
import logo from "../images/musicMeet.png";
import microbg from "../images/microbg.jpg";

function Landing({ userName, setUserName }) {
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

  function handleRedirect(url) {
    return window.open(url);
  }

  return (
    <div className="page-display">
      <div className="first-container slideshow">
        <div className="first-container-text">
          <h2>Meet your Music Hero, Everywhere, Anytime</h2>
          <br />
          <p className="paragraph-firstcontainer">
            Keep yourself updated with the last informations.
          </p>
          <p className="paragraph-firstcontainer">
            Find where your favourite artists, where they are and when they will
            act.
          </p>
        </div>
      </div>
      <div className="second-container">
        <img className="logo-props" src={logo} alt="" />
        <br />
        <form classname="form-style" onSubmit={handleSubmit}>
          <input
            className="input-container"
            type="text"
            placeholder="Write your name"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            className="input-container"
            type="text"
            placeholder="Please select a country"
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
          {error && <span style={{ color: "red" }}>Country is not valid</span>}
          <br />
          <button className="btn-container" type="submit">
            Enter
          </button>
        </form>
        <div className="social-media">
          <div className="wrapper">
            <div className="button">
              <div className="icon">
                <i className="fab fa-facebook-f"></i>
              </div>
              <a
                className="removeHiperLinks"
                onClick={() => {
                  handleRedirect("https://www.facebook.com");
                }}
              >
                <span>Facebook</span>
              </a>
            </div>
            <div className="button">
              <div className="icon">
                <i className="fab fa-instagram"></i>
              </div>
              <a
                className="removeHiperLinks"
                onClick={() => {
                  handleRedirect("https://www.instagram.com");
                }}
              >
                <span>Instagram</span>
              </a>
            </div>
            <div className="button">
              <div className="icon">
                <i className="fab fa-github"></i>
              </div>
              <a
                className="removeHiperLinks"
                onClick={() => {
                  handleRedirect("https://github.com");
                }}
              >
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
