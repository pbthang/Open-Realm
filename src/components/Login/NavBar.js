import React from "react";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          Open Realm
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
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
