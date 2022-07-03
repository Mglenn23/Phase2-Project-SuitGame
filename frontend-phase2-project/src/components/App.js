import "../App.css";
import CardListContainer from "./CardListContainer";
import CardNavbar from "./CardNavbar";
import Home from "./Home";
import HowToPlay from "./HowToPlay";
import LeaderBoard from "./LeaderBoard";
import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
function App() {
  // Put on state to pass the data as props
  const [gameData, setGameData] = useState([]);

  // Grab the Game data from backend
  useEffect(() => {
    fetch("https://backend-phase2-project.herokuapp.com/Game")
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <CardNavbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="games" element={<CardListContainer gameData={gameData} />} />

          <Route exact path="tutorial" element={<HowToPlay />} />
          <Route exact path="leaderBoard" element={<LeaderBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
