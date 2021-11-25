import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/CardDetails.css";

function CardDetails() {
  const [filterType, setFilterType] = useState();

  async function requestApi(countryCode = "GB") {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=${countryCode}&size=10&apikey=qrf4AHhPNz3OMCpLMaTadNgQxJNSHmkc`
    );
    const data = await response.data;
    console.log(data);
  }

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      <div className="slider">
        <div className="slider-content">
          <h2 className="slider-title">
            <strong>Search By Country:</strong>
          </h2>
          <br />
          <input
            type="text"
            list="coutrys"
            name="country"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />
          <datalist id="types">
            {selectionArray.map((selectionItem) => (
              <option key={selectionItem} value={selectionItem}></option>
            ))}
          </datalist>
          <button className="slider-search-btn">Search</button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
