import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
import Loader from "react-loader-spinner";
import { Edit, Plus, ExternalLink, Trash2, Check, X, Eye } from "react-feather";
import { Link, Redirect } from "react-router-dom";
import Header from "../../layout/Header";
import Guidelines from "../../reusables/Guidlines";

const ManageDevelopment = () => {
  const { globals, getTeamDevelopments, team_developments } =
    useContext(GlobalContext);

  const { register, handleSubmit, errors, reset } = useForm();

  const guidelines = ["", "", "", "", ""];

  // const developments = [{}, {}, {}, {}];

  const [state, setState] = useState({
    loading: false,
    leave_type_text: "Annual",
    development_view: 1,
    development: {},
    developments: [
      {
        id: 1,
        need: "Learn Mobile Development",
        description:
          "Develop mobile applications to be used by customers to access company services",
        timeline: "Q1",
        institution: "Admin Technical Institute",
        cost: 3000,
        year: 2023,
        comments: "",
        status: 2,
        member: "Nelson Omoro",
      },
      {
        id: 1,
        need: "Learn Mobile Development",
        description:
          "Develop mobile applications to be used by customers to access company services",
        timeline: "Q1",
        institution: "Admin Technical Institute",
        cost: 3000,
        year: 2023,
        comments: "",
        status: 2,
        member: "Winnie Ndunge",
      },
      {
        id: 1,
        need: "Learn Mobile Development",
        description:
          "Develop mobile applications to be used by customers to access company services",
        timeline: "Q1",
        institution: "Admin Technical Institute",
        cost: 3000,
        year: 2023,
        comments: "",
        status: 2,
        member: "Lawrence Muriithi",
      },
    ],
  });

  const editDevelopment = (id, view) => {
    const the_development = state.developments.filter((o) => o.id === id)[0];

    setState({
      ...state,
      development_view: view,
      development: {
        id: the_development.id,
        need: the_development.need,
        description: the_development.description,
        timeline: the_development.timeline,
        institution: the_development.institution,
        cost: the_development.cost,
        year: the_development.year,
        status: the_development.status,
      },
    });
  };

  const addNewdevelopment = (data) => {
    const identifier = parseInt(data.the_id);

    let filterdevelopments = state.developments;

    if (identifier > 0) {
      filterdevelopments = state.developments.filter(
        (development) => development.id !== identifier
      );
    }

    const submited_development = {
      id: identifier < 1 ? state.developments.length + 1 : identifier,
      need: data.need,
      description: data.description,
      timeline: data.timeline,
      institution: data.institution,
      cost: data.cost,
      comments: data.comments,
      status: data.status,
    };

    const newdevelopment = [...filterdevelopments, submited_development];

    setState({
      ...state,
      developments: newdevelopment,
      development_view: 1,
    });
  };

  const switchdevelopmentView = (selected) => {
    setState({
      ...state,
      development_view: selected,
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
    title: `Manage Development Needs`,
    subTitle: "Manage your team's development needs",
    links: [],
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

  const { loading, development_view, developments, development } = state;

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
                  {development_view === 1 && (
                    <div className="appraisal-list">
                      <h6>Development Needs List</h6>
                      <hr />
                      {developments.map((d, i) => (
                        <div className="objective-view" key={d.id}>
                          <div className="details">
                            <h5>
                              <strong>{d.need}</strong>
                            </h5>
                            <p>
                              <span className="description">
                                {d.description}
                              </span>
                              <br />
                              <span className="timeline">
                                <strong>{d.member}</strong>
                              </span>
                              <br />
                              <span className="timeline">
                                Status :{" "}
                                <strong>
                                  {d.status === 1 && "Approved"}
                                  {d.status === 2 && "Pending"}
                                  {d.status === 3 && "Rejected"}
                                </strong>
                              </span>
                            </p>
                          </div>
                          <div className="action">
                            <button onClick={() => editDevelopment(d.id, 3)}>
                              <Eye size={17} className="edit" />
                            </button>
                            &nbsp;&nbsp;
                            <button>
                              <Trash2 size={17} className="delete" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* <table className="table table-striped table-collapse">
                        <tbody>
                          {developments.map((d, i) => (
                            <tr key={d.id}>
                              <td>{d.need}</td>
                              <td>Ksh {d.cost}</td>
                              <td>{d.institution}</td>
                              <td>{d.timeline}</td>
                              <td>
                                <button onClick={() => editDevelopment(d.id)}>
                                  <Edit />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
                    </div>
                  )}

                  {development_view > 1 && development_view < 4 && (
                    <div className="add-new-appraisal">
                      <form onSubmit={handleSubmit(addNewdevelopment)}>
                        <input
                          type="hidden"
                          name="the_id"
                          ref={register({
                            // required: "Please provide a start date",
                          })}
                          value={development_view === 3 ? development.id : 0}
                        />
                        <div className="row mt-2">
                          <div className="col-md-10 col-12 mb-2">
                            <label htmlFor="leaveType">Development Need</label>
                            <input
                              className="dflt-height"
                              name="need"
                              type="text"
                              defaultValue={
                                development_view < 3 ? "" : development.course
                              }
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
                              placeholder="Detailed description"
                              name="description"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            ></textarea>
                            <span className="err_msg">
                              {errors.description && errors.description.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="leaveType">Learning resource</label>
                            <select
                              name="learning_resource"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                            >
                              <option value="Internal">Internal</option>
                              <option value="External">External</option>
                            </select>
                            <span className="err_msg">
                              {errors.title && errors.title.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="leaveType">
                              Name of Institution
                            </label>
                            <input
                              className="dflt-height"
                              name="institution"
                              type="text"
                              ref={register({
                                // required: "Please provide a start date",
                              })}
                              placeholder="Type name here"
                            />
                            <span className="err_msg">
                              {errors.title && errors.title.message}
                            </span>
                          </div>
                          <div className="col-md-5 col-12 mb-2">
                            <label htmlFor="Effective Period">Timeline</label>
                            <select
                              name="timeline"
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
                          <div className="col-md-10 col-12 mt-3 mb-2">
                            <hr />
                            <h6>
                              <strong>Appraisee Comments</strong>
                            </h6>
                            <p>Appraisee comments will show here</p>
                          </div>

                          {development_view > 2 && (
                            <>
                              <div className="col-md-10 col-12 mt-3 mb-2">
                                <hr />
                                <h6>
                                  <strong>Manager's Section</strong>
                                </h6>
                              </div>
                              <div className="col-md-5 col-12 mb-2">
                                <label htmlFor="Effective Period">
                                  Current Need's Status
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
                              <div className="col-md-5 col-12 mb-2">
                                <label htmlFor="year">Cost</label>
                                <input
                                  className="dflt-height"
                                  name="cost"
                                  type="number"
                                  ref={register({
                                    // required: "Please provide a start date",
                                  })}
                                  placeholder="Enter amount"
                                />
                                <span className="err_msg">
                                  {errors.year && errors.year.message}
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
                              value={development_view > 2 ? "Update " : "Add "}
                            />
                            &nbsp;&nbsp;
                            <button
                              className="btn btn-danger update_changes"
                              onClick={(e) => {
                                e.preventDefault();
                                switchdevelopmentView(1);
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
                                <>{development_view > 2 ? "Update " : "Add "}</>
                              )}
                            </button>
                          </div>
                          <div className="col-md-2 col-6">
                            <button
                              className="btn btn-danger btn-apply"
                              onClick={(e) => {
                                e.preventDefault();
  
                                switchdevelopmentView(1);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div> */}
                      </form>
                    </div>
                  )}

                  {development_view === 4 && (
                    <div className="objective-view">
                      <div className="details">
                        <h5>
                          <strong>{development.need}</strong>
                        </h5>
                        <p>
                          <span className="description">
                            {development.description}
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
                        <h6>
                          <u>Line Manager's Comments</u>
                        </h6>
                        <p>
                          <span className="description">
                            {development.comments
                              ? development.comments
                              : "No Comments"}
                          </span>
                        </p>
                        <div className="manager-actions">
                          <button
                            className="approve"
                            onClick={() => editDevelopment(development.id, 3)}
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
                        <button
                          onClick={() => editDevelopment(development.id, 3)}
                        >
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
  } else {
    return <Redirect to="/staff-appraisal" />;
  }
};

export default ManageDevelopment;
