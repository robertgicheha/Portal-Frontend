import React, { useContext, useEffect } from "react";
import Menu from "../components/layout/Menu";
import BreadCrumb from "../components/sections/BreadCrumb";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";
import Moment from "react-moment";
import { swapSlashes } from "../utils/helpers";

const InternalVacancies = () => {
  const { isLoading, vacancies, getJobVacancies } = useContext(GlobalContext);

  const menu = {
    title: "Internal Vacancies",
    subTitle: "Find and Apply to internal vacancies.",
    links: [],
  };

  useEffect(() => {
    getJobVacancies();

    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the data
          fetches that flip isLoading, so gating it on isLoading itself
          creates a mount -> fetch -> hide -> resolve -> remount loop
          whenever that fetch keeps failing. */}
      <Header />
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading vacancies. Please wait ..." />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="page">
            <div className="container staff">
              <Menu menu={menu} />
              <BreadCrumb />
              <div className="row modules">
                {vacancies.map((v, i) => (
                  <div className="col-md-4 col-12" key={i}>
                    <div className="card">
                      <h6>{v.jobTittle}</h6>
                      <p>
                        <span>
                          <b>Job ID:</b> {v.requisitionNo}
                        </span>
                        <br />
                        <span>
                          <b>Posted On:</b>{" "}
                          <Moment format="Do MMM YYYY">{v.postingDate}</Moment>{" "}
                        </span>
                        <br />
                        <span>
                          <b>Application Deadline:</b>{" "}
                          <Moment format="Do MMM YYYY">
                            {v.applicationDeadline}
                          </Moment>{" "}
                        </span>
                        <br /> <br />
                        <Link
                          to={`/internal-vacancies/${swapSlashes(
                            v.requisitionNo,
                            "/"
                          )}`}
                          style={{ marginTop: "120px !important" }}
                        >
                          <ExternalLink size={14} />
                          &nbsp;View Details
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
                {/* {vacancies.map((v, i) => (
                  <div className="col-md-4 col-12" key={i}>
                    <div className="card">
                      <h6>{v.jobTitle}</h6>
                      <p>
                        <span>
                          <b>Job ID:</b> {v.jobId}
                        </span>
                        <br />
                        <span>
                          <b>Posting On:</b> {v.jobPostDate}
                        </span>
                        <br />
                        <span>
                          <b>Application Deadline:</b> {v.jobApplicationDeadlie}
                        </span>
                        <br />
                        <Link to="">
                          <ExternalLink size={14} />
                          &nbsp;Apply
                        </Link>
                      </p>
                    </div>
                  </div>
                ))} */}
              </div>
              <br />
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InternalVacancies;
