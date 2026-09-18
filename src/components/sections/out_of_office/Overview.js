import React from "react";
import BreadCrumb from "../BreadCrumb";
import moment from "moment";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "react-feather";

const Overview = () => {
  return (
    <>
      <BreadCrumb />
      <div className="row leave">
        <div className="col-md-3 col-12">
          <div className="overview">
            <Link to="out-of-office/apply">
              Create new request&nbsp;&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="card mt-3 px-3 py-3">
        <div className="row">
          <div className="col-md-12 col-12">
            <h6>Application History</h6>
            <hr />
            <p className="p-text">Your recent applications will show here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
