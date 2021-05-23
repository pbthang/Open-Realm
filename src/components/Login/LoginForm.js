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
      <button
        className="btn btn-light btn-md text-center m-5 pr-5 pl-5"
        onClick={() => handleClick(gooogleProvider)}
      >
        <span>
          <img
            className="m-2"
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="logo"
          />
          Login with Google
        </span>
      </button>
    </div>
  );
}

export default LoginForm;
