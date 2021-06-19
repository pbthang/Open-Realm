import React from "react";
import AppShell from "../components/AppShell";
import { Typography } from "@material-ui/core";
import orbital_logo from "../resources/orbital_logo.png"

function About() {
  return (
    <AppShell>
      <div>
        <img src={orbital_logo} alt="Orbital 2021" />
        <Typography variant="h2">About Open Realms</Typography>
        <Typography variant="body1">
          GitHub Repo:{" "}
          <a href="https://github.com/pbthang/Open-Realm">
            https://github.com/pbthang/Open-Realm
          </a>
        </Typography>
      </div>
    </AppShell>
  );
}

export default About;
