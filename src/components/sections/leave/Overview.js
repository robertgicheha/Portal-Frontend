import React from "react";
import BreadCrumb from "../BreadCrumb";
import LeaveHistory from "./History";
import moment from "moment";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "react-feather";

const LeaveOverview = ({ leave_info, leave_history, message }) => {
  const pending = leave_history.filter((leave) => leave.status === 3);

  return (
    <>
      <BreadCrumb />
      {message && (
        <>
          <div className="alert alert-success">{message}</div>
        </>
      )}
      <div className="row leave">
        <div className="col-md-3 col-12">
          <div className="overview">
            <span>LEAVE ALLOCATION</span>
            <h1>{leave_info.annualAlocated}</h1>
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="overview">
            <span>LEAVE BALANCE</span>
            <h1>
              {leave_info.annualAlocated + leave_info.annualTaken}
              <Link to="/leave/annual">
                Apply leave&nbsp;
                <ArrowRightCircle size={16} />
              </Link>
            </h1>
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="overview">
            <span>SICK DAYS BALANCE</span>
            <h1>
              {7 - Math.abs(leave_info.sickTaken)}&nbsp;
              <Link to="/leave/sick">
                Apply sick leave&nbsp;
                <ArrowRightCircle size={16} />
              </Link>
            </h1>
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="overview">
            {leave_info.gender === 1 ? (
              <>
                <span>MATERNITY LEAVE BALANCE</span>
                <h1>
                  {leave_info.maternityAlocated}
                  <Link to="/leave/maternity">
                    Request maternity leave&nbsp;
                    <ArrowRightCircle size={16} />
                  </Link>
                </h1>
              </>
            ) : (
              <>
                <span>PATERNITY LEAVE BALANCE</span>
                <h1>
                  14
                  <Link to="/leave/paternity">
                    Request paternity&nbsp;
                    <ArrowRightCircle size={16} />
                  </Link>
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-3 px-3 py-3">
        <div className="row">
          <div className="col-md-12 col-12">
            <h5>Recent applications</h5>
            <hr />
            {pending.length > 0 ? (
              <>
                {pending.map((filteredleave, i) => (
                  <p key={i}>
                    {filteredleave.LeaveType} {filteredleave.leaveNo}
                    <br />
                    From:&nbsp;
                    <span>
                      {moment(filteredleave.StartDate).format("DD/MM/YYYY")}
                    </span>
                    &nbsp;
                    <br />
                    To:&nbsp;
                    <span>
                      {moment(filteredleave.EndDate).format("DD/MM/YYYY")}
                    </span>
                    <br />
                    Status: <span className="text-primary">Pending</span>
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="p-text">
                  Your recent applications will show here
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-3 px-3 py-3">
        <div className="row">
          <div className="col-md-12 col-12">
            {leave_history.length > 0 ? (
              <LeaveHistory leave_history={leave_history} />
            ) : (
              <>
                <p className="p-text">No leave history</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveOverview;
