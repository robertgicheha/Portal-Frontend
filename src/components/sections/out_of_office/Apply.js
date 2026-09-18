import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
import Loader from "react-loader-spinner";
import { Send } from "react-feather";
import { Link } from "react-router-dom";
import Header from "../../layout/Header";
import Guidelines from "../../reusables/Guidlines";

const Apply = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const [state, setState] = useState({
    loading: false,
    leave_type_text: "Annual",
    show_request_disclaimer: false,
  });

  const changeLoading = (action) => {
    window.scrollTo({
      top: 50,
      left: 100,
      behavior: "smooth",
    });
    setState({
      ...state,
      loading: action,
    });
    reset();
  };

  const guidelines = [
    "Ensure to speak to Line Manager prior to Work from home application.",
    "In case of a misapplication kindly contact HR",
  ];

  const request_types = [
    "Working from home pre-approved",
    "Travelling",
    "Working from Aga Khan Office",
    "Attending a Meeting",
    "Working from another office",
  ];

  const { user_info, message, applyForOutOfOffice, getLeaveDetails } =
    useContext(GlobalContext);

  const menu = {
    title: "Application request",
    subTitle: "Fill in the form",
    links: [],
  };

  const checkRequestType = (request) => {
    let status;

    console.log(request);

    if (request === 1) {
      status = true;
    } else {
      status = false;
    }

    setState({
      ...state,
      show_request_disclaimer: status,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLeaveDetails();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message) {
      changeLoading(false);
    }
    // eslint-disable-next-line
  }, [message]);

  const onSubmit = (data) => {
    data["emp_id"] = user_info.EmployeeNumber;

    // console.log(data);
    changeLoading(true);
    applyForOutOfOffice(data);
  };

  const { loading, show_request_disclaimer } = state;

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          {message && (
            <>
              <div className="alert alert-success">{message}</div>
            </>
          )}
          <div className="row leave">
            <div className="col-md-8 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-2">
                  <div className="col-md-4 col-12 mb-2">
                    <label htmlFor="leaveType">Start date</label>
                    <input
                      className="dflt-height"
                      name="start_date"
                      type="date"
                      // min={moment().add(-1).format("YYYY-MM-DD")}
                      ref={register({
                        required: "Please provide a start date",
                      })}
                      // onChange={(e) => console.log(e.target.value)}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                  </div>
                  <div className="col-md-4 col-12 mb-2">
                    <label htmlFor="leaveType">End date</label>
                    <input
                      className="dflt-height"
                      name="end_date"
                      type="date"
                      // min={moment().add(-1).format("YYYY-MM-DD")}
                      ref={register({
                        required: "Please provide a start date",
                      })}
                      // onChange={(e) => console.log(e.target.value)}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4 col-12 mb-2">
                    <label htmlFor="leaveType">Start time</label>
                    <input
                      className="dflt-height"
                      name="start_time"
                      type="time"
                      value="09:00"
                      min="09:00"
                      max="12:00"
                      // min={moment().add(-1).format("YYYY-MM-DD")}
                      ref={register({
                        required: "Please provide a start date",
                      })}
                      // onChange={(e) => console.log(e.target.value)}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                  </div>
                  <div className="col-md-4 col-12 mb-2">
                    <label htmlFor="leaveType">End time</label>
                    <input
                      className="dflt-height"
                      name="end_time"
                      type="time"
                      value="17:00"
                      min="14:00"
                      max="17:00"
                      // min={moment().add(-1).format("YYYY-MM-DD")}
                      ref={register({
                        required: "Please provide a start date",
                      })}
                      // onChange={(e) => console.log(e.target.value)}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">Request type</label>
                  </div>
                  <div className="col-md-8 col-12 mb-2">
                    {show_request_disclaimer && (
                      <div className="alert alert-danger">
                        Ensure you obtain approval from your line manager
                      </div>
                    )}
                    <select
                      className="dflt-height"
                      name="request_type"
                      onChange={(e) => {
                        checkRequestType(e.target.value);
                      }}
                      ref={register({
                        required: "Please provide a start date",
                      })}
                    >
                      {request_types.map((r, i) => (
                        <option value={i + 1}>{r}</option>
                      ))}
                    </select>
                    <span className="err_msg">
                      {errors.duration && errors.duration.message}
                    </span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">Description</label>
                  </div>
                  <div className="col-md-8 col-12 mb-2">
                    <textarea
                      col="20"
                      rows="5"
                      name="reason"
                      ref={register({
                        required: "Please provide a start date",
                      })}
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-4 mb-4">
                  <div className="col-md-3 col-6">
                    <button type="submit" className="btn btn-success btn-apply">
                      {loading ? (
                        <Loader
                          type="Oval"
                          color="#fff"
                          secondaryColor="#FFFFFF"
                          height={25}
                          width={25}
                          //timeout={0} //3 secs
                        />
                      ) : (
                        <>
                          Submit&nbsp;&nbsp;
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                  {!loading && (
                    <div className="col-md-3 col-6">
                      <Link
                        className="btn btn-danger btn-apply"
                        to="/out-of-office"
                      >
                        Back
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-4 col-12">
              <Guidelines guidelines={guidelines} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
