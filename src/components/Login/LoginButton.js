import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import React from "react";
import { Redirect, withRouter } from "react-router";

function LoginForm() {
  // console.log(history);

  const { loginWithPopup, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Button
      variant="primary"
      type="button"
      size="md"
      onClick={() => loginWithPopup()}
      className="text-center m-1 pl-5 pr-5"
    >
      Login
    </Button>
  );
}

export default LoginForm;
