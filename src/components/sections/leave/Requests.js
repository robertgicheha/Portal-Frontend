import React, { useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import Swal from "sweetalert2";
import NoRecord from "../NoRecord";
import Moment from "react-moment";
import Menu from "../../layout/Menu";
import Header from "../../layout/Header";

const LeaveRequests = () => {
  const { globals, approveLeave, leave_approvals } = useContext(GlobalContext);

  var moment = require("moment");

  const acceptLeave = (leave_no) => {
    Swal.fire({
      title: "Proceed with approval",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      const { isConfirmed } = result;

      let action;

      if (isConfirmed) {
        action = 1;
        approveLeave(leave_no, action);
      }
    });
  };

  async function declineLeave(leave_no) {
    const { value: reason } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Add a reason for declining...",
      showCancelButton: true,
      confirmButtonText: `Decline`,
      confirmButtonColor: "red",
    });

    let action;

    if (reason) {
      action = 2;
      approveLeave(leave_no, action);
    }
  }

  const menu = {
    title: "Leave Management",
    subTitle: "Approve, decline leave from your team",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      // { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  if (globals.role === 2 || globals.role === 0) {
    return <Redirect to="/leave/overview" />;
  } else {
    return (
      <>
        <Header />
        <div className="page">
          <div className="container">
            <Menu menu={menu} />
            <BreadCrumb />
            <div className="row">
              {leave_approvals.length > 0 ? (
                <>
                  <div className="col-12 mobile">
                    {leave_approvals.map((leave, i) => (
                      <>
                        <div className="approve_card">
                          <h5>{leave.name}</h5>
                          <div className="requesters_details">
                            <p>
                              <span>From:&nbsp;</span>
                              <strong>
                                <Moment format="DD/MM/YYYY">
                                  {leave.StartDate}
                                </Moment>
                              </strong>
                              &nbsp;-&nbsp;<span>To:&nbsp;</span>
                              <strong>
                                <Moment format="DD/MM/YYYY">
                                  {leave.EndDate}
                                </Moment>
                              </strong>
                              <br />
                              Duration:{" "}
                              <strong>{leave.duration}&nbsp;days</strong>
                            </p>
                          </div>
                          <div className="action_buttons">
                            <button
                              className="btn btn-success"
                              onClick={() => acceptLeave(leave.leaveNo)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => declineLeave(leave.leaveNo)}
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="col-12 desktop">
                    <div class="table-responsive">
                      <table className="table table-striped table-collapse">
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Start Date</th>
                            <th></th>
                            <th>End Date</th>
                            <th>Duration</th>
                            <th>Reason</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {leave_approvals.map((leave, i) => (
                            <tr key={i}>
                              <td>{leave.name}</td>
                              <td>
                                {moment(leave.StartDate).format("dddd")}
                                ,&nbsp;{moment(leave.StartDate).format("LL")}
                              </td>
                              <td>to</td>
                              <td>
                                {moment(leave.EndDate).format("dddd")}
                                ,&nbsp;{moment(leave.EndDate).format("LL")}
                              </td>
                              <td>{leave.duration}&nbsp;days</td>
                              <td>{leave.reason}</td>
                              <td>
                                <button
                                  className="btn btn-danger custom-btn"
                                  onClick={() => declineLeave(leave.leaveNo)}
                                >
                                  Decline
                                </button>
                                <button
                                  className="btn btn-success custom-btn"
                                  onClick={() => acceptLeave(leave.leaveNo)}
                                >
                                  Approve
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NoRecord
                    text="Sorry there are no requests for approval"
                    link="/leave"
                    btn_text="Back to Leave Management"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LeaveRequests;
