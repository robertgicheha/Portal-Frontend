import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import Menu from "../../../layout/Menu";
import BreadCrumb from "../../BreadCrumb";
import LoaderScreen from "../../../../pages/LoaderScreen";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import { useForm } from "react-hook-form";
import { ChevronsLeft, Download, FileText } from "react-feather";
import _ from "lodash";

const PNine = () => {
  const [selectedYear, setSelectedYear] = useState(0);

  const {
    isLoading,
    loadingStatus,
    getLeaveDetails,
    leave_info,
    downloadP9,
    user_info,
    getPNine,
    p_nine,
    unsetP9,
    deleteP9,
  } = useContext(GlobalContext);

  // const [MonthDetails, setMonthDetails] = useState({});

  // const removeSlip = (emp_id) => {
  //   setTimeout(function () {
  //     deleteSlip(emp_id);
  //   }, 120000);
  // };

  const menu = {
    title: "P9 Form",
    subTitle: "Download P9 Form",
    links: [
      // { url: "/messages", text: "Messages", icon: <MessageSquare size={13} /> },
      // { url: "/profile", text: "Profile", icon: <User size={13} /> },
    ],
  };

  const currentYear = () => {
    const year = new Date().getFullYear();

    return year;
  };

  const employeeJoinDate = () => {
    let joined = new Date(user_info.DateJoined ? user_info.DateJoined : "");

    joined = joined.getFullYear();

    return joined;
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    loadingStatus(true);

    setSelectedYear(data.year);

    getPNine(data.year, leave_info.empNo);

    reset();
  };

  const getYear = () => {
    const year = new Date().getFullYear();

    return year;
  };

  useEffect(() => {
    loadingStatus(false);

    getLeaveDetails();

    return () => {
      unsetP9(false);

      if (p_nine.length > 0) {
        deleteP9(leave_info.empNo);
      }
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row">
            <div className="col-md-12 col-12 profile">
              <div className="row content">
                {/* {employeeJoinDate(user_info.DateJoined) < 2023 ? ( */}
                {/* {2022 < 2023 ? (
                  <>
                    {!isLoading ? (
                      <>
                        {!downloadP9 ? (
                          <>
                            <div className="col-md-2 col-12 mb-2">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <label>Select year</label>
                                <br />
                                <select
                                  name="year"
                                  ref={register({
                                    required: "Please enter password",
                                  })}
                                  onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                  }
                                >
                                  {_.range(
                                    new Date().getFullYear() - 1,
                                    employeeJoinDate() - 1
                                  ).map((_n, i) => (
                                    <option value={_n} key={i}>
                                      {_n}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="submit"
                                  className="btn btn-success update_changes mt-3"
                                >
                                  Click to generate
                                </button>
                              </form>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-md-12">
                              <div className="document_list">
                                <div className="row">
                                  <div className="col-md-8 col-12">
                                    {p_nine.length > 0 ? (
                                      <ul>
                                        {p_nine.map((p, i) => (
                                          <li key={i}>
                                            <Link
                                              to={
                                                "/documents/" +
                                                leave_info.empNo +
                                                "/p9/" +
                                                p
                                              }
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              download
                                            >
                                              <FileText size={19} /> Click here
                                              to download your P9 form for{" "}
                                              {selectedYear}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <div className="alert alert-danger">
                                        Problem occured trying to fetch the
                                        document kindly contact Admin
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-8 col-12">
                                    <br />
                                    <Link
                                      className="back-payslip"
                                      to="/profile/p9"
                                      onClick={() => deleteP9(leave_info.empNo)}
                                    >
                                      <ChevronsLeft size={16} />
                                      &nbsp;Back to p9
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="document_list">
                                <div className="row">
                                  <div className="col-md-8 col-12"></div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <>
                          <div className="small_load_screen">
                            <LoaderScreen text="This might take some time, fetching p9 form" />
                          </div>
                        </>
                      </>
                    )}
                  </>
                ) : (
                  <div className="col-md-12">P9 is unavailable</div>
                )} */}
                <>
                  {!isLoading ? (
                    <>
                      {!downloadP9 ? (
                        <>
                          <div className="col-md-2 col-12 mb-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <label>Select year</label>
                              <br />
                              <select
                                name="year"
                                ref={register({
                                  required: "Please enter password",
                                })}
                                onChange={(e) =>
                                  setSelectedYear(e.target.value)
                                }
                              >
                                {_.range(
                                  new Date().getFullYear() - 1,
                                  employeeJoinDate() - 1
                                ).map((_n, i) => (
                                  <option value={_n} key={i}>
                                    {_n}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="submit"
                                className="btn btn-success update_changes mt-3"
                              >
                                Click to generate
                              </button>
                            </form>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-12">
                            <div className="document_list">
                              <div className="row">
                                <div className="col-md-8 col-12">
                                  {p_nine.length > 0 ? (
                                    <ul>
                                      {p_nine.map((p, i) => (
                                        <li key={i}>
                                          <Link
                                            to={
                                              "/documents/" +
                                              leave_info.empNo +
                                              "/p9/" +
                                              p
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                          >
                                            <FileText size={19} /> Click here to
                                            download your P9 form for{" "}
                                            {selectedYear}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div className="alert alert-danger">
                                      Problem occured trying to fetch the
                                      document kindly contact Admin
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-8 col-12">
                                  <br />
                                  <Link
                                    className="back-payslip"
                                    to="/profile/p9"
                                    onClick={() => deleteP9(leave_info.empNo)}
                                  >
                                    <ChevronsLeft size={16} />
                                    &nbsp;Back to p9
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="document_list">
                              <div className="row">
                                <div className="col-md-8 col-12"></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <>
                        <div className="small_load_screen">
                          <LoaderScreen text="This might take some time, fetching p9 form" />
                        </div>
                      </>
                    </>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PNine;
