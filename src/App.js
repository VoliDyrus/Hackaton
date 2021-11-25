import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountrySearch from "./components/CountrySearch";

import Main from "./components/Main";
import { GenresContextProvider } from "./contexts/GenresContext";

function App() {
  return (
    <GenresContextProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/welcome/" component={<Main />} />
        </Routes>
      </Router>
    </GenresContextProvider>
  );
}

export default App;
