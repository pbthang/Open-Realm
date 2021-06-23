import React from "react";
import LoginNavBar from "../components/LoginNavBar";
import { makeStyles } from "@material-ui/core/styles";
import loginCover from "../resources/loginCover.jpg";
import { Typography } from "@material-ui/core";
import { RandomReveal } from "react-random-reveal";
import TypeWriterEffect from "react-typewriter-effect";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100vh",
    backgroundImage: `url(${loginCover})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPositionY: "100%",
    backgroundPositionX: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.background + 1,
    opacity: 1,
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontFamily: "Orbitron",
    letterSpacing: "1.5rem",
    margin: "2rem 3rem",
    textShadow:
      "4px -4px 0 rgb(255,38,251, 0.7), -4px 4px 0 rgb(44,255,255, 0.7)",
  },
  subtext: {
    color: "#fff",
    fontWeight: 700,
    marginLeft: "3rem",
    marginRight: "10vw",
    textShadow:
      "4px -4px 0 rgb(255,38,251, 0.7), -4px 4px 0 rgb(44,255,255, 0.7)",
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <div>
      <LoginNavBar />
      <div className={classes.background}>
        <Typography variant="h1" className={classes.text}>
          <RandomReveal
            isPlaying
            duration={3}
            revealDuration={0.9}
            characters="Open Realm"
          />
        </Typography>
        <Typography variant="h2" className={classes.subtext}>
          <TypeWriterEffect
            textStyle={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "3rem",
            }}
            startDelay={50}
            cursorColor="white"
            text="The dynamic world of fictional writings."
            typeSpeed={70}
          />
        </Typography>
      </div>
    </div>
  );
}

export default Login;
