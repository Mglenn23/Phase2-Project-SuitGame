import Table from "react-bootstrap/Table";
import ListPlayerData from "./ListPlayerData";
import React, { useEffect, useState } from "react";
function LeaderBoard() {
  const [dataPlayers, setDataPlayers] = useState([]);

  //get data players
  useEffect(() => {
    fetch("https://backend-phase2-project.herokuapp.com/Players")
      .then((res) => res.json())
      .then((data) => setDataPlayers(data));
  }, []);

  //display data players
  const displayDataPlayers = dataPlayers.map((data, idx) => {
    const scoreDetail = JSON.stringify(data.score);
    const sumValues = Object.values(data.score).reduce((a, b) => a + b, 0);

    return <ListPlayerData key={idx} playersDat={data.name} idx={idx} scorePlayer={scoreDetail} totalPlay={sumValues} />;
  });

  return (
    <>
      <h2 className="text-center mt-0" id="h2Game">
        Leader Board
      </h2>
      <hr className="divider" />

      <Table striped bordered hover variant="dark" style={{ marginLeft: "15%", width: "70%" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Score</th>
            <th>Total Play</th>
          </tr>
        </thead>
        <tbody>{displayDataPlayers}</tbody>
      </Table>
    </>
  );
}
export default LeaderBoard;
