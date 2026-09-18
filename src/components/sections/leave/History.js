import React from "react";
import moment from "moment";

const LeaveHistory = ({ leave_history }) => {
  return (
    <>
      {leave_history.length < 1 ? (
        <>
          <h5>
            <strong>No leave history</strong>
          </h5>
        </>
      ) : (
        <>
          <h5>Leave history</h5>
          <div className="table-responsive">
            <table className="table table-striped table-collapse">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              {leave_history.length > 0 && (
                <tbody>
                  {leave_history.map((leave, i) => (
                    <tr key={i}>
                      <td>{leave.LeaveType}</td>
                      <td>
                        {moment(leave.StartDate).format("ddd")},&nbsp;
                        {moment(leave.StartDate).format("LL")}
                      </td>
                      <td>
                        {moment(leave.EndDate).format("ddd")},&nbsp;
                        {moment(leave.EndDate).format("LL")}
                      </td>
                      <td>
                        {leave.duration}&nbsp;day{leave.duration < 2 ? "" : "s"}
                      </td>
                      <td>
                        {leave.status === 0 && (
                          <span className="text-primary">Open</span>
                        )}
                        {leave.status === 1 && (
                          <span className="text-success">Approved</span>
                        )}
                        {leave.status === 2 && (
                          <span className="text-danger">Rejected</span>
                        )}
                        {leave.status === 3 && (
                          <span className="text-warning">Pending</span>
                        )}
                        {leave.status === 4 && (
                          <span className="text-info">Posted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default LeaveHistory;
