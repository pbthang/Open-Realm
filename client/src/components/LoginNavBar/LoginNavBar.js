import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    cursor: "default",
  },
  loginButton: {
    paddingLeft: 50,
    paddingRight: 50,
  },
}));

function NavBar() {
  const classes = useStyles();
  const { loginWithPopup, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Open Realm
        </Typography>
        <Button
          color="inherit"
          className={classes.loginButton}
          onClick={loginWithPopup}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
