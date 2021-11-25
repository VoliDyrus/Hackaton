import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySearch from "./CountrySearch";
import { countriesCode } from "../data/countriesData";
import logo from "../logo.png";

import "../style/Main.css";


function Main() {
  const [filterType, setFilterType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Great Britain");
  const [userName, setUserName] = useState();

  console.log("selectedCountry", selectedCountry);

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedCountry(e.target.elements.country.value)
    setUserName(e.target.value)
  }
  function handleRedirect (url) {
    return(
        window.open(url)
    )
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
    <div className="page-display">
      <img className="logo-props" src={logo} alt=""/>
      <br />
      <form className="form-style" onSubmit={handleSubmit}>
        <input className="input-container"
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => console.log(e.target.value)}
          placeholder="Write your name"
        /><br />        
        <input className="input-container"
          type="text"
          list="country-list"
          name="country"
          id="country"
          onChange={(e) => console.log(e.target.value)}
          data-code="code-test"
          placeholder="Select a city"
        /><br /> 
        <datalist id="country-list" onSelect={(e) => console.log(e.target)}>
          {countriesCode
            .filter((country) => country.name.startsWith(filterType))
            .map((country) => (
              <option key={country.code} value={country.name} />
            ))}
        </datalist><br /> 
          <button className="btn-container" type="submit">Enter</button>
      </form>
      <div className="social-media">
        <div className="wrapper">
          <div className="button">
              <div className="icon"><i className="fab fa-facebook-f"></i></div>
              <a className="removeHiperLinks" onClick={()=>{handleRedirect("https://www.facebook.com/")}}><span>Facebook</span></a>
          </div>
          <div className="button">
              <div className="icon"><i className="fab fa-instagram"></i></div>
              <a className="removeHiperLinks" onClick={()=>{handleRedirect("https://www.instagram.com/")}}><span>Instagram</span></a>
          </div>
          <div className="button">
              <div className="icon"><i className="fab fa-github"></i></div>
              <a className="removeHiperLinks" onClick={()=>{handleRedirect("https://github.com/")}}><span>GitHub</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
