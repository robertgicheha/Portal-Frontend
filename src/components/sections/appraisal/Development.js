import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
import { Edit, Plus, ExternalLink, Send } from "react-feather";
import Header from "../../layout/Header";
import Guidelines from "../../reusables/Guidlines";

const Development = () => {
  const {
    user_info,
    submitNeed,
    developments,
    getDevelopmentNeeds,
    generateAppraisalCode,
  } = useContext(GlobalContext);

  const { register, handleSubmit, errors, reset } = useForm();

  // const developments = [{}, {}, {}, {}];

  const [state, setState] = useState({
    loading: false,
    development_view: 1,
    development: {},
    edit: false,
  });

  const singleDevelopment = (id, view, action = false) => {
    const the_development = developments.filter((o) => o.lineNo === id)[0];

    setState({
      ...state,
      development_view: view,
      development: {
        lineNo: the_development.lineNo,
        course: the_development.nameOfCourse,
        learning_obtained: the_development.LObtained,
        timeline: the_development.timeline,
        learning_resource: the_development.learningResource,
        start_date: the_development.sDate,
        end_date: the_development.eDate,
        institution: the_development.nameOfInstitution,
        cost: 3000,
        year: 2023,
        appraisee_comments: the_development.appraiseeRemarks,
        supervisor_comments: the_development.SupervisorRemarks,
        results_obtained: the_development.RObtained,
        status: 2,
      },
      edit: action,
    });
  };

  const postComment = async (data) => {
    console.log(state.objective);
  };

  const addNewdevelopment = async (data) => {
    const identifier = parseInt(data.the_id);

    let filterdevelopments = developments;

    if (identifier > 0) {
      filterdevelopments = developments.filter(
        (development) => development.lineNo !== identifier
      );
    }

    const submited_development = {
      id: identifier < 1 ? developments.length + 1 : identifier,
      course: data.course,
      learning_obtained: data.learning_obtained,
      timeline: data.timeline,
      institution: data.institution,
      start_date: data.start_date,
      learning_resource: parseInt(data.learning_resource),
      cost: data.cost,
      appraisee_comments:
        data.appraisee_comments === undefined ? "" : data.appraisee_comments,
      supervisor_comments:
        data.supervisor_comments === undefined ? "" : data.supervisor_comments,
      status: data.status === undefined ? 0 : data.status,
      results_obtained:
        data.results_obtained === undefined ? "" : data.results_obtained,
    };

    submited_development.email = user_info.CompanyEmail;

    let code = await generateAppraisalCode(user_info.CompanyEmail);

    submited_development.code = code;

    const addition = await submitNeed(submited_development);

    const newdevelopment = [...filterdevelopments, submited_development];

    if (addition) {
      setState({
        ...state,
        developments: newdevelopment,
        development_view: 1,
      });
    }
  };

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

  const { message, getLeaveDetails } = useContext(GlobalContext);

  const menu = {
    title: `Appraisal`,
    subTitle: "All develpoment needs details",
    links: [],
  };

  const getRequiredData = async () => {
    const results = await getDevelopmentNeeds();
  };

  const guidelines = [
    "Ensure that all fields have a value",
    "Remember to specify the quarter in which the need applies",
    "Add comments where necessary by editing a development need",
    "Remember once comments are added they cannot be deleted",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLeaveDetails();

    getRequiredData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message) {
      changeLoading(false);
    }
    // eslint-disable-next-line
  }, [message]);

  const { loading, development_view, development, edit } = state;

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row appraisal">
            <div className="col-md-8 col-12">
              <div className="appraisal-inner-page">
                {/*Display all Development Needs*/}
                {development_view === 1 && (
                  <>
                    <div className="appraisal-list">
                      {developments.length < 1 ? (
                        <i>Your set development needs will show here</i>
                      ) : (
                        <>
                          {developments.map((d, i) => (
                            <>
                              <div className="objective-view" key={d.lineNo}>
                                <div className="details">
                                  <h5>
                                    <strong>{d.nameOfCourse}</strong>
                                  </h5>
                                  <p>
                                    <span className="description">
                                      {d.LObtained}
                                    </span>
                                    {/* <br />
                                <span className="timeline">
                                  Timeline :{" "}
                                  <strong>
                                    {d.timeline}, {d.year}
                                  </strong>
                                </span>
                                <br />
                                <span className="timeline">
                                  Status :{" "}
                                  <strong>
                                    {d.status === 1 && "Approved"}
                                    {d.status === 2 && "Pending"}
                                    {d.status === 3 && "Rejected"}
                                  </strong>
                                </span> */}
                                    <br />
                                    <div className="full-details-btn">
                                      <button
                                        onClick={() => {
                                          singleDevelopment(d.lineNo, 3, false);
                                        }}
                                      >
                                        &nbsp;Full Details&nbsp;
                                        <ExternalLink size={14} />
                                      </button>
                                    </div>
                                  </p>
                                </div>
                                <div className="action">
                                  <button
                                    title="Edit Development"
                                    onClick={() =>
                                      singleDevelopment(d.lineNo, 2, true)
                                    }
                                  >
                                    <Edit size={22} className="edit" />
                                  </button>
                                </div>
                              </div>
                              <hr />
                            </>
                          ))}
                        </>
                      )}
                    </div>
                    <br />
                    <ul className="appraisal-btn">
                      <li>
                        <button
                          onClick={(e) => {
                            e.preventDefault();

                            setState({
                              ...state,
                              development: {},
                              development_view: 2,
                            });
                          }}
                        >
                          <Plus size={18} />
                          &nbsp;Add Need
                        </button>
                      </li>
                    </ul>
                  </>
                )}

                {/*Add or Edit Development*/}
                {development_view === 2 && (
                  <>
                    <div className="add-new-appraisal">
                      <form onSubmit={handleSubmit(addNewdevelopment)}>
                        <input
                          type="hidden"
                          name="the_id"
                          ref={register({
                            // required: "Please provide a start date",
                          })}
                          value={!edit ? development.lineNo : 0}
                        />
                        <div className="row mt-2">
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="leaveType">Development Need</label>
                            <input
                              className="dflt-height"
                              name="course"
                              type="text"
                              defaultValue={!edit ? "" : development.course}
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Type need here"
                            />
                            <span className="err_msg">
                              {errors.need && errors.need.message}
                            </span>
                          </div>
                          {/* <div className="col-md-12 col-12"></div> */}
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="Description" name="description">
                              Description
                            </label>
                            <textarea
                              placeholder="Objective's detailed description"
                              name="learning_obtained"
                              defaultValue={
                                !edit ? "" : development.learning_obtained
                              }
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            ></textarea>
                            <span className="err_msg">
                              {errors.learning_obtained &&
                                errors.learning_obtained.message}
                            </span>
                          </div>
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="leaveType">
                              Name of Institution (If applicable)
                            </label>
                            <input
                              className="dflt-height"
                              name="institution"
                              type="text"
                              defaultValue={
                                !edit ? "" : development.institution
                              }
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Type name here"
                            />
                            <span className="err_msg">
                              {errors.institution && errors.institution.message}
                            </span>
                          </div>
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="Learning Resource">
                              Learning resource
                            </label>
                            <select
                              name="learning_resource"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            >
                              <option value={1}>
                                Internal i.e. Training, Coaching, Refresher
                                course
                              </option>
                              <option value={2}>
                                External i.e. University, College, Webinar,
                                Symposium
                              </option>
                            </select>
                            <span className="err_msg">
                              {errors.learning_resource &&
                                errors.learning_resource.message}
                            </span>
                          </div>

                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="Period">
                              Period (days, weeks, months, years)
                            </label>
                            <input
                              className="dflt-height"
                              name="timeline"
                              type="text"
                              defaultValue={!edit ? "" : development.timeline}
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Enter period here"
                            />
                            <span className="err_msg">
                              {errors.timeline && errors.timeline.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="Start Date">Start Date</label>
                            <input
                              className="dflt-height"
                              name="start_date"
                              type="date"
                              // min={moment().add(-1).format("YYYY-MM-DD")}
                              ref={register({
                                // required: "Please provide a start date",
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
                        <div className="row mt-1 mb-2">
                          <div className="col-md-6 col-12 my-3">
                            <input
                              type="submit"
                              className="btn btn-success update_changes"
                              value={edit ? "Update " : "Add "}
                            />
                            &nbsp;&nbsp;
                            <button
                              className="btn btn-danger update_changes"
                              onClick={(e) => {
                                e.preventDefault();

                                setState({
                                  ...state,
                                  development: {},
                                  development_view: 1,
                                  edit: false,
                                });
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                )}

                {/*Single Development view with Comments*/}
                {development_view === 3 && (
                  <>
                    <div className="add-new-appraisal">
                      <div className="objective-view">
                        <div className="details">
                          <h4>
                            <strong>{development.course}</strong>
                          </h4>
                          <p>
                            <span className="description">
                              {development.learning_obtained}
                            </span>
                            <br />
                            <span className="timeline">
                              Institution :{" "}
                              <strong>{development.institution}</strong>
                            </span>
                            <br />
                            <span className="timeline">
                              Timeline :{" "}
                              <strong>
                                {development.timeline}, {development.year}
                              </strong>
                            </span>
                            <br />
                            <span className="timeline">
                              Status :{" "}
                              <strong>
                                {development.status === 1 && "Approved"}
                                {development.status === 2 && "Pending"}
                                {development.status === 3 && "Rejected"}
                              </strong>
                            </span>
                            <br />
                          </p>
                          <br />
                          <div className="row">
                            <div className="col-md-10 col-12 mb-2">
                              <br />
                              <h6>
                                <u>Additional's Comments</u>
                              </h6>
                              <p className="comment comment-supervisor">
                                <span>
                                  <b>Supervisor&nbsp;:&nbsp;&nbsp;&nbsp;</b>
                                </span>
                                <span>
                                  Ensure that institution selected offers a
                                  Certificate after completion
                                </span>
                              </p>

                              {development.comments && (
                                <>
                                  <p className="comment comment-apraisee">
                                    <span>
                                      <b>
                                        {user_info.FirstName}
                                        &nbsp;:&nbsp;&nbsp;&nbsp;
                                      </b>
                                    </span>
                                    <span>
                                      Task will be completed before the end of
                                      March
                                    </span>
                                  </p>
                                  <p className="comment comment-supervisor">
                                    <span>
                                      <b>Supervisor&nbsp;:&nbsp;&nbsp;&nbsp;</b>
                                    </span>
                                    <span>
                                      Ensure that you begin and end the task on
                                      time as this will be used to determine yor
                                      final score
                                    </span>
                                  </p>
                                  <p className="comment comment-supervisor">
                                    <span>
                                      <b>Supervisor&nbsp;:&nbsp;&nbsp;&nbsp;</b>
                                    </span>
                                    <span>
                                      Task will be completed before the end of
                                      March
                                    </span>
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-10 col-12 mb-2">
                              <form onSubmit={handleSubmit(postComment)}>
                                <textarea
                                  placeholder="Add new comment here ..."
                                  name="appraisee_comments"
                                  ref={register({
                                    required: "Please add a comment",
                                  })}
                                ></textarea>
                                <span className="err_msg">
                                  {errors.appraisee_comments &&
                                    errors.appraisee_comments.message}
                                </span>
                                <br />
                                <div className="row mt-1 mb-2">
                                  <div className="col-md-6 col-12 my-3">
                                    <button
                                      className="btn btn-success update_changes"
                                      type="submit"
                                    >
                                      <Send size={17} />
                                      &nbsp;Send
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                      className="btn btn-danger update_changes"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        singleDevelopment(1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="action">
                          <button
                            onClick={() =>
                              singleDevelopment(development.lineNo, 2, true)
                            }
                          >
                            <Edit size={22} className="edit" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* <hr /> */}
              </div>
            </div>
            <div className="col-md-4 col-12">
              <Guidelines title="" guidelines={guidelines} />
            </div>
          </div>
          {/* <div className="row leave">
            <div className="col-md-8 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  name="type"
                  value="Annual"
                  ref={register()}
                />
              </form>
            </div>
           
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Development;
