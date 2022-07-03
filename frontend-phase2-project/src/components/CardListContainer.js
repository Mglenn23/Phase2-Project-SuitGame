import ListChoice from "./ListChoice";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap/";
import uuid from "react-uuid";
function CardListContainer({ gameData }) {
  const [botChoose, setBotChoose] = useState([]);
  const [userChoose, setUserChoose] = useState([]);
  const [playerData, setPlayer] = useState([]);
  const [gameStatus, setGameStatus] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [show, setShow] = useState(false);

  const [uuID, setUUID] = useState("");

  const counts = {};

  //count game status from player
  gameStatus.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  //update player status game data if any change
  useEffect(() => {
    updatePlayerData();
  }, [gameStatus]);

  //function handle after player choose
  function handlerChoose(userChooseValue) {
    //fucntion for bot random choose
    const randomBotChoose = Math.floor(Math.random() * 3);

    gameData.map((data, idx) => {
      if (idx === randomBotChoose) {
        return setBotChoose(data);
      }
    });

    gameData.map((data) => {
      if (data.type === userChooseValue) {
        return setUserChoose(data);
      }
    });
    setShow((s) => !s);
  }

  //update status data game player
  function updatePlayerData() {
    return fetch(`https://backend-phase2-project.herokuapp.com/Players/${uuID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: counts,
      }),
    });
  }

  //validation game
  if (userChoose.type) {
    if (userChoose.type === botChoose.type) {
      setTimeout(() => {
        Swal.fire({
          title: "Draw!",
          text: "Almost win!",
          icon: "warning",
        });
        setBotChoose([]);
        setUserChoose([]);
        setGameStatus([...gameStatus, "Draw"]);
        updatePlayerData();
      }, 1500);
    } else if (userChoose.type === "scissors") {
      if (botChoose.type === "rock") {
        setTimeout(() => {
          Swal.fire({
            title: "Try Again!",
            text: "You Lose!",
            icon: "error",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Wrong"]);
          updatePlayerData();
        }, 1500);
      } else {
        setTimeout(() => {
          Swal.fire({
            title: "Congrats",
            text: "You Win!",
            icon: "success",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Correct"]);
          updatePlayerData();
        }, 1500);
      }
    } else if (userChoose.type === "rock") {
      if (botChoose.type === "paper") {
        setTimeout(() => {
          Swal.fire({
            title: "Try Again!",
            text: "You Lose!",
            icon: "error",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Wrong"]);
          updatePlayerData();
        }, 1500);
      } else {
        setTimeout(() => {
          Swal.fire({
            title: "Congrats",
            text: "You Win!",
            icon: "success",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Correct"]);
          updatePlayerData();
        }, 1500);
      }
    } else if (userChoose.type === "paper") {
      if (botChoose.type === "scissors") {
        setTimeout(() => {
          Swal.fire({
            title: "Try Again!",
            text: "You Lose!",
            icon: "error",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Wrong"]);
          updatePlayerData();
        }, 1500);
      } else {
        setTimeout(() => {
          Swal.fire({
            title: "Congrats",
            text: "You Win!",
            icon: "success",
          });
          setBotChoose([]);
          setUserChoose([]);
          setGameStatus([...gameStatus, "Correct"]);
          updatePlayerData();
        }, 1500);
      }
    }
  }

  // show list of choice for player
  const mapData = gameData.map((data, idx) => {
    return <ListChoice key={idx} img={data.img} name={data.type} fncHandler={handlerChoose} />;
  });

  // handle player name
  function handlerInputName(event) {
    setPlayer(event.target.value);
  }

  //set UUID player
  useEffect(() => {
    setUUID(uuid());
  }, [playerData]);

  return (
    <>
      <section className="" id="">
        {
          // validation player already input name or not
          !showInput ? (
            <div>
              <div className="containerGame">
                <div className="contentGame">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();

                      if (playerData.length > 0) {
                        const itemData = {
                          id: uuID,
                          name: playerData,
                          score: counts,
                        };

                        // add player data to db
                        fetch("https://backend-phase2-project.herokuapp.com/Players", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(itemData),
                        });
                        setShowInput(true);
                      } else {
                        Swal.fire({
                          title: "Try Again!",
                          text: "Input Your Name!",
                          icon: "error",
                        });
                      }
                    }}
                  >
                    <Form.Group className="mb-3 " controlId="formGroupEmail">
                      <Form.Label>Input Your Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" onChange={handlerInputName} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button variant="secondary" size="lg" type="submit">
                        Play
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-center mt-0" id="h2Game">
                Play Time!
                <h4>{playerData}</h4>
              </h2>
              <hr className="divider" />

              <div className="containerGame">
                <div className="contentGame">
                  <h4>Your Selection</h4>
                  <img src={userChoose.img} />
                </div>
                <div className="contentGame">
                  <h4>Bot Selection</h4>
                  <img src={botChoose.img} />
                </div>
              </div>
              <div className="containerGame">
                {!show ? <h3>Choose!</h3> : null}
                {!show ? mapData : <img className="tryAgain" src="https://media3.giphy.com/media/iNVNRnOmRuK64vYwrN/200w.gif?cid=82a1493bx35d45aqb5ejibqcyo18ikc23tvpacs7i5eicthz&rid=200w.gif&ct=s" onClick={() => setShow(false)} />}
              </div>
            </div>
          )
        }
      </section>
    </>
  );
}
export default CardListContainer;
