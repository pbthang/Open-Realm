import React from "react";
import firebase from "../../config/firebase";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a class="nav-link" href="#">
              Features
            </a>
            <a class="nav-link" href="#">
              Pricing
            </a>
          </div>
          <button
            type="button"
            class="btn btn-primary d-flex justify-content-end"
            onClick={() => firebase.auth().signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
