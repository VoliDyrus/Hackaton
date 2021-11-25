import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/FirstLanding";
import Main from "./components/Main";
import { GenresContextProvider } from "./contexts/GenresContext";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <GenresContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/welcome/:country" element={<Main />} />
          <Route path="/welcome/land" element={<LandingPage />} />
        </Routes>
      </Router>
    </GenresContextProvider>
  );
}

export default App;
