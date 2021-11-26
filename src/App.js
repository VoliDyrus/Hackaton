import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CardDetails from "./components/CardDetails";
import Favorites from "./components/Favorites";
import Landing from "./components/FirstLanding";
import Main from "./components/Main";

import { GenresContextProvider } from "./contexts/GenresContext";
import { FavoriteContextProvider } from "./contexts/FavoriteContext";
import BigCard from "./components/BigCard";

function App() {
  return (
    <GenresContextProvider>
      <FavoriteContextProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Landing />} />
            <Route path="/welcome/:country" element={<Main />} />
            <Route path="/welcome/:country/favorites" element={<Favorites />} />
            <Route path="/welcome/:country/:id" element={<BigCard />} />
          </Routes>
        </Router>
      </FavoriteContextProvider>
    </GenresContextProvider>
  );
}

export default App;
