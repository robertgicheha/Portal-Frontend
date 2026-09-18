import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText } from "react-feather";

const ResourceForms = () => {
  const quicks = [
    {
      title: "MIC Beneficiary Form",
      link: "/documents/staff/mic/Beneficiary Form - MIC Global Risks_v2023.pdf",
      btn_text: "Download",
    },
    {
      title: "MIC Privacy Policy",
      link: "/documents/staff/mic/MIC Privacy Policy.pdf",
      btn_text: "Download",
    },
    {
      title: "EHS Privacy Policy",
      link: "/documents/staff/ehs/EHS Privacy Policy.pdf",
      btn_text: "Download",
    },
    {
      title: "EHS Beneficiary Form",
      link: "/documents/staff/ehs/Beneficiary Form - Executive Healthcare Solutions_v2023.pdf",
      btn_text: "Download",
    },
    {
      title: "Complaints Procedure",
      link: "/documents/staff/Complaints Procedure.pdf",
      btn_text: "Download",
    },
    {
      title: "Data Protection Policy",
      link: "/documents/staff/Data protection policy.pdf",
      btn_text: "Download",
    },
    {
      title: "Incident Management",
      link: "/documents/staff/Incident Management.pdf",
      btn_text: "Download",
    },
    {
      title: "IT Security Policy",
      link: "/documents/staff/IT Security Policy - 2024.pdf",
      btn_text: "Download",
    },
    {
      title: "Code of Conduct & Ethics 2025 - EHS",
      link: "/documents/staff/ehs/Code of Conduct & Ethics 2025 - EHS.pdf",
      btn_text: "Download",
    },
    {
      title: "Code of Conduct & Ethics 2025 - MIC TZ",
      link: "/documents/staff/mic/Code of Conduct & Ethics 2025 - MIC TZ.pdf",
      btn_text: "Download",
    },
    {
      title: "Code of Conduct & Ethics 2025 - MIC UG",
      link: "/documents/staff/mic/Code of Conduct & Ethics 2025 - MIC UG.pdf",
      btn_text: "Download",
    },
    {
      title: "Code of Conduct & Ethics 2025 - MIC",
      link: "/documents/staff/mic/Code of Conduct & Ethics 2025 - MIC.pdf",
      btn_text: "Download",
    },
    {
      title: "Disciplinary Policy & Procedure 2025 - EHS",
      link: "/documents/staff/ehs/Disciplinary Policy & Procedure 2025 - EHS.pdf",
      btn_text: "Download",
    },
    {
      title: "Disciplinary Policy & Procedure 2025 - MIC",
      link: "/documents/staff/Disciplinary Policy & Procedure 2025 - MIC.pdf",
      btn_text: "Download",
    },
    {
      title: "FAQ - Code of Conduct & Ethics 2025",
      link: "/documents/staff/FAQ - Code of Conduct & Ethics 2025.pdf",
      btn_text: "Download",
    },
    {
      title: "Grievance Handling Policy & Procedure 2025 - EHS.pdf",
      link: "/documents/staff/ehs/Incident Management.pdf",
      btn_text: "Download",
    },
    {
      title: "Grievance Handling Policy & Procedure 2025 - MIC",
      link: "/documents/staff/mic/Grievance Handling Policy & Procedure 2025 - MIC.pdf",
      btn_text: "Download",
    },
  ];
  return (
    <>
      <div className="row modules">
        {quicks.map((q, i) => (
          <div className="col-md-4 col-12" key={i}>
            <div className="card">
              <h6>{q.title}</h6>
              <p>
                <Link
                  to={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <FileText size={19} />
                  &nbsp;{q.btn_text}
                </Link>
                {/* <Link
                  to={"/documents/" + leave_info.empNo + "/p9/" + p}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <FileText size={19} /> Click here to download your P9 form for{" "}
                  {selectedYear}
                </Link> */}
              </p>
            </div>
          </div>
        ))}
      </div>
      <br />
    </>
  );
};

export default ResourceForms;
