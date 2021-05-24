import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import { Switch, Redirect, Route } from "react-router";
import Entry from "../pages/Entry";
import Login from "../pages/Login";

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Entry} />
    </Switch>
  );
}

export default UnauthenticatedApp;
