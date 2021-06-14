import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../pages/Loading";

function PrivateRoute({ component, ...rest }) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...rest}
    />
  );
}

export default PrivateRoute;
