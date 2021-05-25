import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../pages/Login";
import Cookies from "js-cookie";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  // const { isAuthenticated } = useAuth0();
  const isAuthenticated = !!Cookies.get("auth0.is.authenticated");

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!isAuthenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
