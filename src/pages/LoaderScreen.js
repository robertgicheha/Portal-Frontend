import React from "react";
import { BallBeat } from "react-pure-loaders";

const Loader = ({ text }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      <p>
        One moment please ... <br />
        {text}
        <br />
        <br />
        <BallBeat
          color={"#123abc"}
          loading={true}
          style={{ textAlign: "center" }}
        />
      </p>
    </div>
  );
};

export default Loader;
