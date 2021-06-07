import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute({ component: RouteComponent, ...rest }) {
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
