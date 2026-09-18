import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
// import Loader from "react-loader-spinner";
import { Check, Edit, Eye, Trash2, X } from "react-feather";
// import { Link } from "react-router-dom";
import Header from "../../layout/Header";
import Guidelines from "../../reusables/Guidlines";
import { Redirect } from "react-router-dom";

const ManageObjective = () => {
  const {
    globals,
    getTeamObjectives,
    team_objectives,
    getLeaveDetails,
    message,
  } = useContext(GlobalContext);

  const { register, handleSubmit, errors, reset } = useForm();

  const [state, setState] = useState({
    loading: false,
    leave_type_text: "Annual",
    objective_view: 1,
    objective: {},
  });

  const editObjective = (id, view) => {
    const the_objective = team_objectives.filter((o) => o.id === id)[0];

    setState({
      ...state,
      objective_view: view,
      objective: {
        id: the_objective.id,
        title: the_objective.title,
        description: the_objective.description,
        year: the_objective.year,
        effective_period: the_objective.effective_period,
        weight: the_objective.weight,
        comments: the_objective.comments,
        status: the_objective.status,
        appraisee_comments: the_objective.appraisee_comments,
        supervisor_comments: the_objective.supervisor_comments,
        member: the_objective.member,
      },
    });
  };

  const addNewObjective = (data) => {
    const identifier = parseInt(data.the_id);

    let filterObjectives = team_objectives;

    if (identifier > 0) {
      filterObjectives = team_objectives.filter(
        (objective) => objective.id !== identifier
      );
    }

    const submited_Objective = {
      id: identifier < 1 ? team_objectives.length + 1 : identifier,
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
      member: data.member,
    };

    const newObjective = [...filterObjectives, submited_Objective];

    setState({
      ...state,
      objectives: newObjective,
      objective_view: 1,
    });
  };

  const switchObjectiveView = (selected) => {
    setState({
      ...state,
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

  const menu = {
    title: `Manage Objectives`,
    subTitle: "Manage your team's objectives",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLeaveDetails();

    getTeamObjectives();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message) {
      changeLoading(false);
    }
    // eslint-disable-next-line
  }, [message]);

  const { loading, objective_view, objective } = state;

  if (globals.role === 1) {
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
                  {objective_view === 1 && (
                    <div className="appraisal-list">
                      <h6>Objective List</h6>
                      <hr />
                      {team_objectives.map((o, i) => (
                        <div className="objective-view" key={o.id}>
                          <div className="details">
                            <h5>
                              <strong>{o.title}</strong>
                            </h5>
                            <p>
                              <span className="description">
                                {o.description}
                              </span>
                              <br />
                              <span className="timeline">
                                <strong>{o.member}</strong>
                              </span>
                              <br />
                              <span className="timeline">
                                Status :{" "}
                                <strong>
                                  {o.status === 1 && "Approved"}
                                  {o.status === 2 && "Pending"}
                                  {o.status === 3 && "Rejected"}
                                </strong>
                              </span>
                            </p>
                          </div>
                          <div className="action">
                            <button onClick={() => editObjective(o.id, 3)}>
                              <Eye size={17} className="edit" />
                            </button>
                            &nbsp;&nbsp;
                            <button>
                              <Trash2 size={17} className="delete" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {objective_view > 1 && objective_view < 4 && (
                    <div className="add-new-appraisal">
                      <form onSubmit={handleSubmit(addNewObjective)}>
                        <input
                          type="hidden"
                          name="the_id"
                          ref={register({
                            // required: "Please provide a start date",
                          })}
                          value={objective_view === 3 ? objective.id : 0}
                        />
                        <input
                          type="hidden"
                          name="member"
                          ref={register({
                            // required: "Please provide a start date",
                          })}
                          value={objective.member}
                        />
                        <div className="row mt-2">
                          <div className="col-md-10 col-12 mb-2">
                            <h5>
                              <strong>{objective.member}</strong>
                            </h5>
                          </div>
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="leaveType">Title</label>
                            <input
                              className="dflt-height"
                              name="title"
                              type="text"
                              defaultValue={
                                objective_view < 3 ? "" : objective.title
                              }
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Objective title"
                            />
                            <span className="err_msg">
                              {errors.title && errors.title.message}
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
                              defaultValue={
                                objective_view < 3 ? "" : objective.description
                              }
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            ></textarea>
                            <span className="err_msg">
                              {errors.description && errors.description.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="year">Year</label>
                            <select
                              name="year"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            >
                              <option value="2023">2023</option>
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
                          {objective_view > 2 && (
                            <>
                              <div className="col-md-10 col-12 mt-3 mb-2">
                                <hr />
                                <h6>
                                  <strong>Manager's Section</strong>
                                </h6>
                              </div>
                              <div className="col-md-5 col-12 mt-3 mb-2">
                                <label htmlFor="Effective Period">
                                  Current Objective's Status
                                </label>
                                <select
                                  name="status"
                                  ref={register({
                                    // required: "Please provide a start date",
                                  })}
                                >
                                  <option value={1}>Pending</option>
                                  <option value={2}>Approved</option>
                                  <option value={3}>Rejected</option>
                                </select>
                                <span className="err_msg">
                                  {errors.status && errors.status.message}
                                </span>
                              </div>
                              <div className="col-md-5 col-12 mt-3 mb-2">
                                <label htmlFor="Effective Period">
                                  Add weightage in percentage
                                </label>
                                <input
                                  className="dflt-height"
                                  name="weight"
                                  type="number"
                                  min={1}
                                  defaultValue={
                                    objective_view < 3 ? 0 : objective.weight
                                  }
                                  ref={register({
                                    // required: "Please provide a start date",
                                  })}
                                  placeholder="Objective title"
                                />
                                <span className="err_msg">
                                  {errors.weight && errors.weight.message}
                                </span>
                              </div>
                              <div className="col-md-10 col-12 mt-3 mb-2">
                                <label htmlFor="Comments" name="comments">
                                  Comments
                                </label>
                                <textarea
                                  placeholder="Add comments here"
                                  name="comments"
                                  ref={register({
                                    // required: "Please provide a start date",
                                  })}
                                ></textarea>
                                <span className="err_msg">
                                  {errors.comments && errors.comments.message}
                                </span>
                                <br />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="row mt-1 mb-2">
                          <div className="col-md-6 col-12 my-3">
                            <input
                              type="submit"
                              className="btn btn-success update_changes"
                              value={objective_view > 2 ? "Update " : "Add "}
                            />
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
                        {/* <div className="row mt-1 mb-2">
                          <div className="col-md-2 col-6">
                            <button
                              type="submit"
                              className="btn btn-success btn-apply"
                            >
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
                                <>{objective_view > 2 ? "Update " : "Add "}</>
                              )}
                            </button>
                          </div>
                          <div className="col-md-2 col-6">
                            <button
                              className="btn btn-danger btn-apply"
                              onClick={(e) => {
                                e.preventDefault();
  
                                switchObjectiveView(1);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div> */}
                      </form>
                    </div>
                  )}

                  {objective_view === 4 && (
                    <div className="objective-view">
                      <div className="details">
                        <h5>
                          <strong>{objective.title}</strong>
                        </h5>
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
                        <br />
                        <h6>
                          <u>Line Manager's Comments</u>
                        </h6>
                        <p>
                          <span className="description">
                            {objective.comments
                              ? objective.comments
                              : "No Comments"}
                          </span>
                        </p>
                        <div className="manager-actions">
                          <button
                            className="approve"
                            onClick={() => editObjective(objective.id, 3)}
                          >
                            <Check size={16} />
                            Edit & Approve
                          </button>
                          &nbsp;&nbsp;
                          <button className="reject">
                            <X size={16} />
                            Reject
                          </button>
                          &nbsp;
                        </div>
                      </div>
                      <div className="action">
                        <button onClick={() => editObjective(objective.id, 3)}>
                          <Edit size={17} className="edit" />
                        </button>
                        &nbsp;&nbsp;
                        <button>
                          <Trash2 size={17} className="delete" />
                        </button>
                      </div>
                    </div>
                  )}

                  <hr />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <Guidelines />
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
  } else {
    return <Redirect to="/staff-appraisal" />;
  }
};

export default ManageObjective;
