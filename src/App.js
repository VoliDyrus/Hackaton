import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Favorites from "./components/Favorites";
import Landing from "./components/FirstLanding";
import Main from "./components/Main";
import { GenresContextProvider } from "./contexts/GenresContext";
import { FavoriteContextProvider } from "./contexts/FavoriteContext";

function App() {
  return (
    <GenresContextProvider>
      <FavoriteContextProvider>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/*" element={<Landing />} />
            <Route path="/welcome/:country" element={<Main />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </FavoriteContextProvider>
    </GenresContextProvider>
  );
}

export default App;
