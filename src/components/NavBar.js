import React, { useContext } from "react";
import firebase from "../config/firebase";
import { Navbar, Nav, Button, Image, Dropdown } from "react-bootstrap";
import { AuthContext } from "./Auth";

function NavBar() {
  const { currUser } = useContext(AuthContext);
  console.log(currUser);
  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Navbar.Brand href="/">Open Realm</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#">Link</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle className="pl-4 pr-4">
            <Image
              src={currUser.photoURL}
              roundedCircle
              height="30"
              className="dropdown-toggle mr-3"
            />
            <span>Hi, {currUser.displayName}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/home">Profile</Dropdown.Item>
            <Dropdown.Item
              type="button"
              onClick={() => firebase.auth().signOut()}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
