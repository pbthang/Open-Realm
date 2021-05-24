import React from "react";
import { Button, Jumbotron } from "react-bootstrap";

function Entry() {
  return (
    <div>
      <Jumbotron variant="dark" className="bg-primary">
        <h1 className="text-light m-5">Hello, welcome to the Open Realm!</h1>
        <p className="text-light m-5">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button href="/login" className="ml-5">
            Login here
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default Entry;
