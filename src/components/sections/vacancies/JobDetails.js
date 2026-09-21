import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../BreadCrumb";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../layout/Menu";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import Moment from "react-moment";
import LoaderScreen from "../../../pages/LoaderScreen";
import { getEmploymentType } from "../../../utils/helpers";

const JobDetails = () => {
  const { jobID } = useParams();

  const { vacancy, getJobVacancy, isLoading, sendApplication } =
    useContext(GlobalContext);

  // NEW: local state for application flow
  const [showApplicationBox, setShowApplicationBox] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const menu = {
    title: "Job Details",
    subTitle: "Showing Job Details",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (jobID) {
      getJobVacancy(jobID);
    }
    // eslint-disable-next-line
  }, [jobID]);

  if (!jobID) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No job selected</h2>
        <p>Please choose a job from the internal vacancies list.</p>
      </div>
    );
  }

  // Helper renderers
  const renderKeyResponsibilities = () => {
    const list = vacancy?.keyResponsibilities;
    if (!list || list.length === 0) {
      return <p>No key responsibilities specified.</p>;
    }

    return (
      <ul className="job-requirements">
        {list.map((item, index) => (
          <li key={index}>{item.responsibilityDescription}</li>
        ))}
      </ul>
    );
  };

  const renderEducation = () => {
    const list = vacancy?.education;
    if (!list || list.length === 0) {
      return <p>No education requirements specified.</p>;
    }

    return (
      <ul className="job-requirements">
        {list.map((item, index) => (
          <li key={index}>{item.qualificationDescription}</li>
        ))}
      </ul>
    );
  };

  const renderJobExperience = () => {
    const list = vacancy?.jobExperience;
    if (!list || list.length === 0) {
      return <p>No experience requirements specified.</p>;
    }

    return (
      <ul className="job-requirements">
        {list.map((item, index) => (
          <li key={index}>{item.experienceDescription}</li>
        ))}
      </ul>
    );
  };

  const renderTechnicalSkills = () => {
    const list = vacancy?.technicalSkills;
    if (!list || list.length === 0) {
      return <p>No technical skills specified.</p>;
    }

    return (
      <ul className="job-requirements">
        {list.map((item, index) => (
          <li key={index}>{item.technicalSkillDescription}</li>
        ))}
      </ul>
    );
  };

  const renderCoreCompetences = () => {
    const list = vacancy?.coreCompetences;
    if (!list || list.length === 0) {
      return <p>No core competences specified.</p>;
    }

    return (
      <ul className="job-requirements">
        {list.map((item, index) => (
          <li key={index}>
            {/* <strong>{item.competenceCode}:</strong>  */}
            {item.competenceDescription}
          </li>
        ))}
      </ul>
    );
  };

  // NEW: click handler for sending application
  const handleSendApplicationClick = async () => {
    // If already submitted, do nothing
    if (submitSuccess) return;

    // First click just shows the textarea
    if (!showApplicationBox) {
      setShowApplicationBox(true);
      return;
    }

    // Only submit when textarea has some content
    if (!applicationMessage.trim()) {
      return;
    }

    try {
      // Assuming sendApplication returns true on success
      const result = await sendApplication({
        jobId: vacancy.jobId,
        message: applicationMessage.trim(),
      });

      if (result === true) {
        setSubmitSuccess(true);
      }
    } catch (e) {
      // handle error if needed (toast, message, etc.)
      console.error("Failed to submit application", e);
    }
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="load_screen">
            <LoaderScreen text="Loading job details" />
          </div>
        </>
      )}
      {!isLoading && vacancy && (
        <>
          <Header />
          <div className="page">
            <div className="container">
              <Menu menu={menu} />
              <BreadCrumb />
              <div className="row modules">
                <div className="col-md-12 col-12">
                  <div className="card">
                    <h2>{vacancy.jobTittle}</h2>
                    <h4>{vacancy.department}</h4>
                    <ul className="job-options">
                      <li>
                        <b>Location:</b> {vacancy.city}
                      </li>
                      <li>
                        <b>Job ID:</b> {vacancy.jobId}
                      </li>
                      <li>
                        <b>Job Type:</b>{" "}
                        {getEmploymentType(vacancy.employmentType)}
                      </li>
                      <li>
                        <b>Deadline:</b>{" "}
                        <Moment format="Do MMM YYYY">
                          {vacancy.applicationDeadline}
                        </Moment>
                      </li>
                    </ul>
                    <hr />
                    <p>{vacancy.roleOverview}</p>
                    <hr />
                    <h5>
                      <b>Key Responsibilities</b>
                    </h5>
                    {renderKeyResponsibilities()}
                    <hr />
                    <h5>
                      <b>Education</b>
                    </h5>
                    {renderEducation()}
                    <hr />
                    <h5>
                      <b>Job Experience</b>
                    </h5>
                    {renderJobExperience()}
                    <hr />
                    <h5>
                      <b>Technical Skills</b>
                    </h5>
                    {renderTechnicalSkills()}
                    <hr />
                    <h5>
                      <b>Core Competencies</b>
                    </h5>
                    {renderCoreCompetences()}
                    <hr />

                    {/* NEW: textarea + success message */}
                    {showApplicationBox && (
                      <div className="application-message-section">
                        <label
                          htmlFor="applicationMessage"
                          style={{ display: "block", marginBottom: 8 }}
                        >
                          Add a message to hiring manager
                        </label>
                        <textarea
                          id="applicationMessage"
                          className="form-control"
                          rows="4"
                          placeholder="Type message here..."
                          value={applicationMessage}
                          onChange={(e) =>
                            setApplicationMessage(e.target.value)
                          }
                        />
                        {submitSuccess && (
                          <p
                            className="mt-2"
                            style={{ color: "green", fontWeight: "500" }}
                          >
                            Message submitted successfully.
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      className="send-application-btn"
                      onClick={handleSendApplicationClick}
                      disabled={submitSuccess}
                      style={{ marginTop: 16 }}
                    >
                      {submitSuccess
                        ? "Application submitted"
                        : "Send Application"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobDetails;
