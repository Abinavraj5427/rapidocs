import React from "react";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  return (
    <div className="landing">
      <div className="landing-inner">
        <h1 className="L">rapidocs</h1>
        <p className="S">never fill out medical forms twice</p>
        <br />
        <p className="continue" onClick={() => history.push("/login")}>
          {">"} continue
        </p>
      </div>
    </div>
  );
};

export default Landing;
