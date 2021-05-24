import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currUser } = useContext(AuthContext);
  console.log(currUser);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" {...routeProps} />
        )
      }
    />
  );
}

export default PrivateRoute;
