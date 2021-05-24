import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../pages/Login";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!isAuthenticated ? <RouteComponent {...routeProps} /> : <Login />
      }
    />
  );
}

export default PrivateRoute;
