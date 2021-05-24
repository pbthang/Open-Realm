import React from "react";
import { Navbar, Nav, Image, Dropdown } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { user, logout } = useAuth0();
  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Navbar.Brand href="/home">Open Realm</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#">Link</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle className="pl-4 pr-4">
            <Image
              src={user.picture}
              roundedCircle
              height="30"
              className="dropdown-toggle mr-3"
            />
            <span>Hi, {user.given_name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item type="button" onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
