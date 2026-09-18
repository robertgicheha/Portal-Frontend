import React from "react";
import { Link } from "react-router-dom";

const ApplyLeave = () => {
  return (
    <>
      <div className="card guideline mt-3 px-3 py-3">
        <div className="row">
          <div className="col-md-12 col-12">
            <h5>How to apply for leave</h5>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-12">
            <ol>
              <li>
                Navigate to <Link to="/">Dashboard.</Link>
              </li>
              <li>
                Once on the dashboard click on the&nbsp;
                <Link to="/leave">Leave Management</Link>
                &nbsp;module.
              </li>
              <li>
                You will be presented with an overview. Click on Apply. This
                will direct you to a form for you to fill. Once done click on
                submit application
              </li>
              <li>
                You should get a message confirming that your leave has been
                posted for approval.
              </li>
              <li>
                Incase of any error during the application process kindly
                contact the HR.
              </li>
            </ol>
          </div>
        </div>

        {/* <h6>
          <b>Using the portal</b>
        </h6> */}
      </div>
    </>
  );
};

export default ApplyLeave;
