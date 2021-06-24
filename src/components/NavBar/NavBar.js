import React from "react";
import { AppBar, Typography, Toolbar, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    cursor: "default",
  },
  avatar: {
    marginRight: 10,
    marginLeft: 10,
  },
  avatarText: {
    display: "inline",
    color: "#fff",
    textTransform: "none",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
  },
}));

function NavBar() {
  const classes = useStyles();
  const { user } = useAuth0();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Open Realm
        </Typography>
        {!!(user?.nickname && user?.picture) && (
          <span className={classes.userInfo}>
            <span className={classes.avatarText}>Hi, {user?.nickname}</span>
            <Avatar className={classes.avatar} src={user?.picture} />
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
