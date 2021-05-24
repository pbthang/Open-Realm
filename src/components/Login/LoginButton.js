import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import socialMediaAuth from "../../services/auth";

function LoginButton({ provider, imgSrc, history, children }) {
  const handleClick = useCallback(
    async (provider) => {
      try {
        const res = await socialMediaAuth(provider);
        history.push("/home");
      } catch (err) {
        console.log(err);
      }
    },
    [history]
  );

  return (
    <div>
      <Button
        variant="light"
        type="button"
        size="md"
        onClick={() => handleClick(provider)}
        className="text-center m-3 pl-5 pr-5"
      >
        <img className="m-2" src={imgSrc} alt="logo" height="30" />
        {children}
      </Button>
    </div>
  );
}

export default LoginButton;
