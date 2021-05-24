import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import { Switch, Redirect, Route } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

function AuthenticatedApp() {
  const { currUser } = useContext(AuthContext);
  return !!currUser ? (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  ) : (
    <Redirect to="/login" />
  );
}

export default AuthenticatedApp;
