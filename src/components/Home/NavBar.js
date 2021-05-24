import React from "react";
import firebase from "../../config/firebase";
import { Navbar, Nav, Button } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Navbar.Brand href="/">Open Realm</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#">Link</Nav.Link>
        </Nav>
        <Button type="button" onClick={() => firebase.auth().signOut()}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
