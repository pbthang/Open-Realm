import React from "react";
import { Route } from "react-router-dom";
import Loading from "../pages/Loading";
import Login from "../pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";

function PrivateRoute({ component: Component, ...rest }) {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  if (error)
    enqueueSnackbar("Cannot authenticate user", {
      variant: "error",
    });

  if (isLoading) return <Loading />;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && user.email_verified) {
          return <Component {...props} />;
        } else {
          return <Login />;
        }
      }}
    />
  );
}

export default PrivateRoute;
