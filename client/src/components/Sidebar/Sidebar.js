import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { ThemeContext } from "../../ThemeContextProvider";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import InfoIcon from "@material-ui/icons/Info";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import CreateIcon from "@material-ui/icons/Create";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

function Sidebar() {
  const classes = useStyles();
  const { logout, user } = useAuth0();

  const { theme, setThemeLocally } = useContext(ThemeContext);
  const handleSwitchChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setThemeLocally(newTheme);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button key="Home" component="a" href="/home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            key="Profile"
            component="a"
            href={`/profile/${user?.sub}`}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button key="Create" component="a" href="/create">
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button key="Bookmarked" component="a" href="/bookmarked">
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarked" />
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem key="Theme">
            <FormControlLabel
              control={
                <Switch
                  checked={theme === "dark"}
                  onChange={handleSwitchChange}
                  name="isDarkTheme"
                />
              }
              label={theme === "dark" ? "Dark Theme" : "Light Theme"}
            />
          </ListItem>

          <ListItem button key="About" component="a" href="/about">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem
            button
            key="Logout"
            onClick={() => {
              logout();
              window.sessionStorage.clear();
            }}
          >
            <ListItemIcon>
              <MeetingRoomRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
