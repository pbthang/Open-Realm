import { Button } from "react-bootstrap";
import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router";
import { gooogleProvider } from "../../config/authMethods";
import socialMediaAuth from "../../services/auth";
import { AuthContext } from "../Auth";
import "./LoginForm.css";

function LoginForm({ history }) {
  const handleClick = useCallback(
    async (provider) => {
      try {
        const res = await socialMediaAuth(provider);
        history.push("/");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    [history]
  );

  const { currUser } = useContext(AuthContext);

  if (currUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-fluid text-center">
      <Button
        variant="light"
        type="button"
        size="md"
        onClick={() => handleClick(gooogleProvider)}
        className="text-center m-5 pl-5 pr-5"
      >
        <img
          className="m-2"
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="logo"
        />
        Login with Google
      </Button>
    </div>
  );
}

export default LoginForm;
