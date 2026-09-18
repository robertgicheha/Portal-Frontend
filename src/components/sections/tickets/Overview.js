import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "react-feather";

const Overview = () => {
  return (
    <div className="row leave">
      <div className="col-md-3 col-12">
        <div className="overview">
          <span>
            <b>ALL TICKETS RAISED</b>
          </span>
          <h1>
            0
            <Link to="/ticketing/raise">
              Raise ticket&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </h1>
        </div>
      </div>
      <div className="col-md-3 col-12">
        <div className="overview">
          <span>
            <b>PENDING TICKETS</b>
          </span>
          <h1>
            0
            <Link to="/ticketing/pending">
              View pending&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </h1>
        </div>
      </div>
      <div className="col-md-3 col-12">
        <div className="overview">
          <span>
            <b>CLOSED TICKETS</b>
          </span>
          <h1>
            0
            <Link to="/ticketing/closed">
              View closed&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </h1>
        </div>
      </div>
      <div className="col-md-3 col-12">
        <div className="overview">
          <span>
            <b>AVAILABLE TECHNICAL STAFF</b>
          </span>
          <h1>
            5
            <Link to="/ticketing/technicians">
              View available&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Overview;
