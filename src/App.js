import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import CountrySearch from "./components/CountrySearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountrySearch />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
