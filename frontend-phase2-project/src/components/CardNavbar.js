import { Nav, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "../App.css";
function CardNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" exact className="CardNavbar">
              Game Corner
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink to="/games" exact className="CardNavbar">
                Card Game
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/tutorial" exact className="CardNavbar">
                How To Play
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/leaderBoard" exact className="CardNavbar">
                Leader board
              </NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default CardNavbar;
