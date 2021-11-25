import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/FirstLanding";
import Main from "./components/Main";
import { GenresContextProvider } from "./contexts/GenresContext";

function App() {
  return (
    <GenresContextProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Landing />} />
          <Route path="/welcome/:country" element={<Main />} />
        </Routes>
      </Router>
    </GenresContextProvider>
  );
}

export default App;
