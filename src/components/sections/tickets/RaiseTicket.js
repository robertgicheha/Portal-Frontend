import React, { useEffect } from "react";
import Menu from "../../layout/Menu";
import Header from "../../layout/Header";
import BreadCrumb from "../../sections/BreadCrumb";
import { useForm } from "react-hook-form";
import moment from "moment";

const RaiseTicket = (props) => {
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const menu = {
    title: "Ticket Management",
    subTitle: "Manage my tickets",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      // { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  const onSubmit = (data) => {
    // raiseTicket(data);
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row leave">
            <div className="col-md-8 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <label htmlFor="project">Project/System</label>
                    <select
                      name="project"
                      ref={register({
                        required: "Please project or system",
                      })}
                      className="dflt-height"
                    >
                      <option value="">Choose</option>
                      <option value="1">Navision</option>
                      <option value="2">Others</option>
                    </select>
                    <span className="err_msg">
                      {errors.project && errors.project.message}
                    </span>
                  </div>
                  <div className="col-md-6 col-12">
                    <label htmlFor="database">Database</label>
                    <select
                      name="database"
                      ref={register()}
                      className="dflt-height"
                    >
                      <option value="">Choose Database</option>
                      <option value="1">EHS (KE)</option>
                      <option value="2">EHS (ROW)</option>
                      <option value="3">MIC (TZ)</option>
                      <option value="4">SMM</option>
                      <option value="5">MIC (KE)</option>
                      <option value="6">MIC (UG)</option>
                    </select>
                    <span className="err_msg">
                      {errors.database && errors.database.message}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="database">Change required on:</label>
                    <select
                      name="change_type"
                      ref={register({
                        required: "Please choose one",
                      })}
                      className="dflt-height"
                    >
                      <option value="">Choose</option>
                      <option value="1">Application</option>
                      <option value="2">Hardware</option>
                      <option value="3">Network</option>
                      <option value="4">Operating System/Utilites</option>
                      <option value="5">Database</option>
                      <option value="6">Procedures</option>
                      <option value="7">Security</option>
                      <option value="8">Schedule outage</option>
                    </select>
                    <span className="err_msg">
                      {errors.change_type && errors.change_type.message}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <label htmlFor="project">Change Priority</label>
                    <select
                      name="change_priority"
                      ref={register({
                        required: "Please choose priority",
                      })}
                      className="dflt-height"
                    >
                      <option value="">Choose priority</option>
                      <option value="1">Urgent</option>
                      <option value="2">High</option>
                      <option value="3">Medium</option>
                      <option value="4">Low</option>
                    </select>
                    <span className="err_msg">
                      {errors.change_priority && errors.change_priority.message}
                    </span>
                    <br />
                    <br />
                    <label htmlFor="database">Reason for change</label>
                    <textarea
                      name="reason_for_change"
                      ref={register({
                        required: "Please add reason for change",
                      })}
                    ></textarea>
                    <span className="err_msg">
                      {errors.reason_for_change &&
                        errors.reason_for_change.message}
                    </span>
                  </div>
                  <div className="col-md-6 col-12">
                    <label htmlFor="project">Change Impact</label>
                    <select
                      name="change_impact"
                      ref={register({
                        required: "Please add change impact",
                      })}
                      className="dflt-height"
                    >
                      <option value="">Choose priority</option>
                      <option value="1">Minor</option>
                      <option value="2">Medium</option>
                      <option value="3">Major</option>
                    </select>
                    <span className="err_msg">
                      {errors.change_impact && errors.change_impact.message}
                    </span>
                    <br />
                    <br />
                    <label htmlFor="database">Change Description</label>
                    <textarea
                      name="change_description"
                      ref={register({
                        required: "Please add description",
                      })}
                    ></textarea>
                    <span className="err_msg">
                      {errors.change_description &&
                        errors.change_description.message}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <label htmlFor="database">Change needed by</label>
                    <input
                      className="dflt-height"
                      name="change_needed_by"
                      type="date"
                      min={moment().add(-1).format("YYYY-MM-DD")}
                      ref={register({
                        required: "Please provide a date",
                      })}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <hr />
                  </div>
                </div>
                <div className="row mt-3 mb-5">
                  <div className="col-md-3 col-12">
                    <button type="submit" className="nxt-btn btn btn-success">
                      Send for Approval
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 col-12">
              {/* <h6>Regulations</h6>
              <ol>
                <li>
                  Application should be made at least a day before the desired
                  date of leave.
                </li>
                <li>In case of a misapplication kindly contact HR</li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseTicket;
