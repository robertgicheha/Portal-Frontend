import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb";
import { useForm } from "react-hook-form";
import moment from "moment";
import { GlobalContext } from "../../../../context/GlobalState";
import Menu from "../../../layout/Menu";
import Loader from "react-loader-spinner";
import { Send } from "react-feather";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Guidelines from "../../../reusables/Guidlines";
import { sick_leave_guidelines } from "../../../../utils/helpers";

const Sick = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const [state, setState] = useState({
    loading: false,
    leave_type_text: "Annual",
    yesterday: moment().add(-1).format("YYYY-MM-DD"),
  });

  const changeLoading = (action) => {
    window.scrollTo({
      top: 50,
      left: 100,
      behavior: "smooth",
    });
    setState({
      loading: action,
    });
    reset();
  };

  const { message, applyForLeave, leave_info, getLeaveDetails } =
    useContext(GlobalContext);

  const menu = {
    title: "Sick Leave",
    subTitle: "Fill in the form",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLeaveDetails(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message) {
      changeLoading(false);
    } // eslint-disable-next-line
  }, [message]);

  const sickLeaveBalance = (days) => {
    // 7 - parseInt(leave_info.sickTaken);

    return 7 + parseInt(days);
  };

  const onSubmit = (data) => {
    // console.log("welcome");

    // if (!data.file?.[0]) return; // guard: no file chosen

    // const formData = new FormData();
    // formData.append("file", data.file[0]);

    // console.log(data);
    changeLoading(true);

    applyForLeave(data);
  };

  const { loading } = state;

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row leave">
            <div className="col-md-8 col-12">
              {message ? (
                <>
                  <div className="alert alert-success">{message}</div>
                </>
              ) : (
                <div className="alert alert-warning">
                  Your sick leave remaining balance is&nbsp;
                  <b>{7 + parseInt(leave_info.sickTaken)} day(s)</b>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  name="type"
                  value="Sick"
                  ref={register({
                    required: "Please provide a start date",
                  })}
                />
                <div className="row">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">Leave start date</label>
                  </div>
                  <div className="col-md-6 col-12">
                    <input
                      className="dflt-height"
                      name="start_date"
                      type="date"
                      // min={state.yesterday}
                      ref={register({
                        required: "Start date cannot be empty",
                      })}
                      defaultValue={new Date() || "Enter start date"}
                      placeholder="Enter start_date"
                    />
                    <span className="err_msg">
                      {errors.start_date && errors.start_date.message}
                    </span>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">Duration in days</label>
                  </div>
                  <div className="col-md-6 col-12">
                    <input
                      className="dflt-height"
                      name="duration"
                      type="number"
                      min="1"
                      max={sickLeaveBalance(leave_info.sickTaken)}
                      step="any"
                      ref={register({
                        required: "Duration cannot be empty",
                      })}
                      defaultValue={1}
                      placeholder="Enter duration"
                    />
                    <span className="err_msg">
                      {errors.duration && errors.duration.message}
                    </span>
                    <hr />
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">
                      Attach receipt or doctor's letter
                    </label>
                  </div>
                  <div className="col-md-9 col-12">
                    <input
                      className="dflt-height"
                      name="supporting_document"
                      type="file"
                      ref={register("file", {
                        required: "File is required",
                      })}
                    />
                    <hr />
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-md-12 col-12">
                    <label htmlFor="leaveType">Comments</label>
                  </div>
                  <div className="col-md-9 col-12 mb-2">
                    <textarea col="20" name="reason"></textarea>
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
                      <Link className="btn btn-danger btn-apply" to="/leave">
                        Back
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-4 col-12">
              <Guidelines guidelines={sick_leave_guidelines} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sick;
