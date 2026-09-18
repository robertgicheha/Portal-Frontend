import React from "react";

const AuthHeader = ({ instruction }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>
            {/* <b>EHS&nbsp;|&nbsp;MIC</b> */}
            <b>Staff Portal</b>
          </h3>
          <span>{instruction}</span>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
