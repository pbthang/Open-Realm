import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router";
import {
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../config/authMethods";
import { AuthContext } from "../Auth";
import LoginButton from "./LoginButton";

function LoginForm({ history }) {
  const { currUser } = useContext(AuthContext);

  if (currUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-fluid text-center mt-5 mb-5">
      <LoginButton
        history={history}
        provider={googleProvider}
        imgSrc="https://img.icons8.com/color/144/000000/google-logo.png"
      >
        Login with Google
      </LoginButton>
      <LoginButton
        history={history}
        provider={facebookProvider}
        imgSrc="https://img.icons8.com/color/144/000000/facebook-new.png"
      >
        Login with Facebook
      </LoginButton>
      <LoginButton
        history={history}
        provider={githubProvider}
        imgSrc="https://img.icons8.com/material-sharp/96/000000/github.png"
      >
        Login with Github
      </LoginButton>
    </div>
  );
}

export default withRouter(LoginForm);
