import React from "react";
import AppShell from "../components/AppShell";
import { Typography } from "@material-ui/core";

function About() {
  return (
    <AppShell>
      <div>
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
