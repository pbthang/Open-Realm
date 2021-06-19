import React from "react";
import AppShell from "../components/AppShell";
import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import orbital_logo from "../resources/orbital_logo.png"

const useStyles = makeStyles( (theme) => ({
  large: {
    height: 200,
    width: 200,
  }
}));

function About() {
  const classes = useStyles();
  return (
    <AppShell>
      <div>
        <Avatar src={orbital_logo} alt="Orbital 2021" className={classes.large}/>
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
