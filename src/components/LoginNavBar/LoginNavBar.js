import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import { AppBar, Toolbar, Typography, Button, Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import UserDataService from "../../services/user.service";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    cursor: "default",
  },
  loginButton: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  emailVerify: {
    margin: "1rem",
    padding: "1rem",
    position: "fixed",
    width: "90%",
  },
  resendEmail: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

function NavBar() {
  const classes = useStyles();
  const { loginWithPopup, isAuthenticated, user } = useAuth0();

  if (isAuthenticated && user?.email_verified) {
    return <Redirect to="/home" />;
  } else {
    return (
      <>
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
        <div style={{ position: "fixed" }}>
          <Toolbar />
          <EmailVerify />
        </div>
      </>
    );
  }
}

function EmailVerify() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();

  const resendEmail = async () => {
    try {
      const response = await UserDataService.resendEmail(user.sub);
      console.log(response.data);
      enqueueSnackbar("Email sent successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error sending email", { variant: "error" });
    }
  };

  if (isAuthenticated && !user?.email_verified) {
    return (
      <Paper className={classes.emailVerify} variant="outlined">
        <Typography variant="body1">
          A verification link has been sent to your email account. Please click
          the link to verify your account. If there are any problems with the
          link, please click{" "}
          <span className={classes.resendEmail} onClick={resendEmail}>
            here
          </span>{" "}
          to resend a new one.
        </Typography>
      </Paper>
    );
  } else {
    return null;
  }
}

export default NavBar;
