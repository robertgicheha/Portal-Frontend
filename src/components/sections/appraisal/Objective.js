import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
import { Edit, ExternalLink, Plus, Send } from "react-feather";
import Header from "../../layout/Header";
import Guidelines from "../../reusables/Guidlines";

const Objective = () => {
  const {
    user_info,
    generateAppraisalCode,
    submitObjective,
    getObjectives,
    objectives,
    globals,
  } = useContext(GlobalContext);

  const { register, handleSubmit, errors, reset } = useForm();

  const [state, setState] = useState({
    loading: false,
    leave_type_text: "Annual",
    objective_view: 1,
    objective: {},
    rating: 0,
    edit: false,
    // objectives: [],
  });

  const singleObjective = (id, view, action = false) => {
    const the_objective = objectives.filter((o) => o.lineNo === id)[0];

    setState({
      ...state,
      objective_view: view,
      objective: {
        lineNo: the_objective.lineNo,
        title: the_objective.ptargets,
        description: the_objective.appComments,
        year: !the_objective.year ? 2023 : the_objective.year,
        effective_period: the_objective.effective_period,
        weight: the_objective.weight,
        comments: the_objective.comments,
        rating: the_objective.agreedResults,
        status: the_objective.status,
        appraisee_comments: the_objective.appraisee_comments,
        supervisor_comments: the_objective.supervisor_comments,
      },
      edit: action,
    });
  };

  const postComment = async (data) => {
    console.log(state.objective);
  };

  const addNewObjective = async (data) => {
    const identifier = parseInt(data.the_id);

    let filterObjectives = objectives;

    if (identifier > 0) {
      filterObjectives = state.objectives.filter(
        (objective) => objective.lineNo !== identifier
      );
    }

    const submited_Objective = {
      id: identifier < 1 ? objectives.length + 1 : identifier,
      title: data.title,
      description: data.description,
      year: data.year,
      effective_period: data.effective_period,
      weight: !data.weight ? 0 : data.weight,
      comments: !data.comments ? "" : data.comments,
      status: 2,
      appraisee_comments:
        data.appraisee_comments === undefined ? "" : data.appraisee_comments,
      supervisor_comments:
        data.supervisor_comments === undefined ? "" : data.supervisor_comments,
    };

    submited_Objective.email = user_info.CompanyEmail;
    submited_Objective.rating = parseInt(state.rating);

    let result = await generateAppraisalCode(user_info.CompanyEmail);

    submited_Objective.code = result;

    const addition = await submitObjective(submited_Objective);

    const newObjective = [...filterObjectives, submited_Objective];

    if (addition) {
      setState({
        ...state,
        objectives: newObjective,
        objective_view: 1,
      });
    }
  };

  const switchObjectiveView = (selected) => {
    setState({
      ...state,
      objective: {},
      objective_view: selected,
    });
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
    subTitle: "All appraisal details",
    links: [],
  };

  const guidelines = [
    "Ensure that all fields have a value",
    "Remember to specify the quarter in which the objective applies",
    "Add comments where necessary by editing an objective",
    "Remember once comments are added they cannot be deleted",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLeaveDetails();

    console.log(globals);

    getObjectives();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message) {
      changeLoading(false);
    }
    // eslint-disable-next-line
  }, [message]);

  const { objective_view, objective, edit } = state;

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
                {/*Display all Objectives*/}
                {objective_view === 1 && (
                  <>
                    <div className="appraisal-list">
                      {objectives.length < 1 ? (
                        <i>Your set objectives will show here</i>
                      ) : (
                        <>
                          {objectives.map((o, i) => (
                            <>
                              <div className="objective-view" key={o.lineNo}>
                                <div className="details">
                                  <h5>
                                    <strong>{o.ptargets}</strong>
                                  </h5>
                                  <p>
                                    <span className="description">
                                      {o.appComments}
                                    </span>
                                    {/* <br />
                                  <span className="timeline">
                                    Timeline :{"6 months"}
                                    <strong>
                                      {o.effective_period}, {o.year}
                                    </strong>
                                  </span> */}
                                    <br />
                                    <span className="timeline">
                                      Status : <strong>Pending Approval</strong>
                                      {/* <strong>
                                      {o.status === 1 && "Approved"}
                                      {o.status === 2 && "Pending"}
                                      {o.status === 3 && "Rejected"}
                                    </strong> */}
                                    </span>
                                    <br />
                                    <div className="full-details-btn">
                                      <button
                                        onClick={() => {
                                          singleObjective(o.lineNo, 3, false);
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
                                    title="Edit Objective"
                                    onClick={() =>
                                      singleObjective(o.lineNo, 2, true)
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
                              objective: {},
                              objective_view: 2,
                            });
                          }}
                        >
                          <Plus size={18} />
                          &nbsp;Add objective
                        </button>
                      </li>
                    </ul>
                  </>
                )}

                {/*Add or Edit Objective*/}
                {objective_view === 2 && (
                  <>
                    <div className="add-new-appraisal">
                      <form onSubmit={handleSubmit(addNewObjective)}>
                        <input
                          type="hidden"
                          name="the_id"
                          ref={register({
                            // required: "Please provide a start date",
                          })}
                          value={!edit ? objective.lineNo : 0}
                        />
                        <div className="row mt-2">
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="leaveType">Title</label>
                            <input
                              className="dflt-height"
                              name="title"
                              type="text"
                              defaultValue={!edit ? "" : objective.title}
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Objective title"
                            />
                            <span className="err_msg">
                              {errors.title?.type === "required" &&
                                "Title cannot be empty"}
                            </span>
                          </div>
                          {/* <div className="col-md-12 col-12"></div> */}
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="Description" name="description">
                              Description
                            </label>
                            <textarea
                              placeholder="Objective's detailed description"
                              name="description"
                              defaultValue={!edit ? "" : objective.description}
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            ></textarea>
                            <span className="err_msg">
                              {errors.description && errors.description.message}
                            </span>
                          </div>
                          <br />
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="year">Year</label>
                            <select
                              name="year"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            >
                              <option value={!edit ? 2023 : objective.year}>
                                {!edit ? 2023 : objective.year}
                              </option>
                            </select>
                            <span className="err_msg">
                              {errors.year && errors.year.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="Effective Period">
                              Effective Period
                            </label>
                            <select
                              name="effective_period"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            >
                              <option value="Q1">Q1</option>
                              <option value="Q2">Q2</option>
                              <option value="Q3">Q3</option>
                              <option value="Q4">Q4</option>
                            </select>
                            <span className="err_msg">
                              {errors.effective_period &&
                                errors.effective_period.message}
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
                                  objective: {},
                                  objective_view: 1,
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

                {/*Single Objective view with Comments*/}
                {objective_view === 3 && (
                  <>
                    <div className="add-new-appraisal">
                      <div className="objective-view">
                        <div className="details">
                          <h4>
                            <strong>{objective.title}</strong>
                          </h4>
                          <p>
                            <span className="description">
                              {objective.description}
                            </span>
                            <br />
                            <span className="timeline">
                              Timeline :{" "}
                              <strong>
                                {objective.effective_period}, {objective.year}
                              </strong>
                            </span>
                            <br />
                            <span className="timeline">
                              Status :{" "}
                              <strong>
                                {objective.status === 1 && "Approved"}
                                {objective.status === 2 && "Pending"}
                                {objective.status === 3 && "Rejected"}
                              </strong>
                            </span>
                            <br />
                            <span className="timeline">
                              Weight : <strong>{objective.weight}</strong>
                            </span>
                          </p>
                          <div className="row">
                            <div className="col-md-10 col-12 mb-2">
                              <br />
                              <h6>
                                <u>Additional's Comments</u>
                              </h6>
                              <p className="comment comment-apraisee">
                                <span>
                                  <b>
                                    {user_info.FirstName}
                                    &nbsp;:&nbsp;&nbsp;&nbsp;
                                  </b>
                                </span>
                                <span>
                                  Task will be completed before the end of March
                                </span>
                              </p>
                              <p className="comment comment-supervisor">
                                <span>
                                  <b>Supervisor&nbsp;:&nbsp;&nbsp;&nbsp;</b>
                                </span>
                                <span>
                                  Ensure that you begin and end the task on time
                                  as this will be used to determine your final
                                  score
                                </span>
                              </p>

                              {objective.comments && (
                                <>
                                  <p className="comment comment-apraisee">
                                    <span>
                                      <b>Nelson&nbsp;:&nbsp;&nbsp;&nbsp;</b>
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
                                        switchObjectiveView(1);
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
                              singleObjective(objective.lineNo, 2, true)
                            }
                          >
                            <Edit size={22} className="edit" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
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

export default Objective;
