import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoginButton from "./LoginButton";

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
        <LoginButton />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
