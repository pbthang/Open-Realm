import React, { useContext, useState } from "react";
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
  Fab,
  useMediaQuery,
} from "@material-ui/core";
import { ThemeContext } from "../../ThemeContextProvider";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import InfoIcon from "@material-ui/icons/Info";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import CreateIcon from "@material-ui/icons/Create";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

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
  menuButton: {
    position: "fixed",
    bottom: 20,
    left: 20,
    zIndex: 99999,
  },
}));

function Sidebar() {
  const classes = useStyles();
  const { logout, user } = useAuth0();
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(isMedium);

  const { theme, setThemeLocally } = useContext(ThemeContext);
  const handleSwitchChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setThemeLocally(newTheme);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant={isMedium ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="Home" component="a" href="/home" id="homeNav">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              key="Search"
              component="a"
              href="/search"
              id="searchNav"
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem
              button
              key="Profile"
              component="a"
              href={`/profile/${user?.sub}`}
              id="profileNav"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              key="Create"
              component="a"
              href="/create"
              id="createNav"
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem
              button
              key="Bookmarked"
              component="a"
              href="/bookmarked"
              id="bookmarkedNav"
            >
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

            <ListItem
              button
              key="About"
              component="a"
              href="/about"
              id="aboutNav"
            >
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
              }}
              id="logoutBtn"
            >
              <ListItemIcon>
                <MeetingRoomRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      {isMedium &&
        (open ? (
          <Fab
            className={classes.menuButton}
            onClick={() => setOpen((open) => !open)}
          >
            <CloseIcon />
          </Fab>
        ) : (
          <Fab
            className={classes.menuButton}
            onClick={() => setOpen((open) => !open)}
          >
            <MenuIcon />
          </Fab>
        ))}
    </>
  );
}

export default Sidebar;
