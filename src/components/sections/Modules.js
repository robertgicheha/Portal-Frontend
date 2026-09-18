import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";

const Module = () => {
  const modules = [
    {
      title: "Leave Management",
      link: "/leave",
      intro: "Manage leave application and also check your history",
      btn_text: <>Manage Leave</>,
    },
    {
      title: "Out of Office",
      link: "/out-of-office",
      intro: "Request to work out of office and remote working.",
      btn_text: <>Manage requests</>,
    },
    {
      title: "Staff Appraisal",
      link: "/staff-appraisal",
      intro: "Manage your objectives and development needs",
      btn_text: <>Explore Appraisal</>,
    },
    {
      title: "User Guide",
      link: "/how-to",
      intro:
        "Easily find common policies and procedures hosted on your dashboard.",
      btn_text: <>Learn how to</>,
    },
    {
      title: "Ticketing",
      link: "/ticketing",
      intro: "Management of incidents and malfunctions for quicker resolution",
      btn_text: <>Manage Tickets</>,
    },
    // {
    //   title: "Staff Attendance",
    //   link: "/staff-attendance",
    //   intro: "Manage your objectives and development needs",
    //   btn_text: <>Explore Attendance</>,
    // },
    {
      title: "Staff Welfare",
      link: "/",
      intro: "Easy and quick access to staff welfare management",
      btn_text: <>Manage Welfare</>,
    },
    // {
    //   title: "Staff Gallery",
    //   link: "/",
    //   intro: "Access to staff pictures, videos from previous events",
    //   btn_text: <>Open gallery</>,
    // },
    // {
    //   title: "Staff directory",
    //   // link: "/staff-directory",
    //   // link: "/",
    //   intro:
    //     "Quickly access mobile numbers, emails and extensions for easy communication",
    //   btn_text: <>Open Directory</>,
    // },
    {
      title: "CSR",
      // link: "/csr",
      link: "/",
      intro:
        "Stay up to date with Community Social Responsibility activities within the office.",
      btn_text: <>Browse CSR</>,
    },
    {
      title: "Internal Vacancies",
      link: "/internal-vacancies",
      intro:
        "Browse through available vacancies within the office and easliy apply.",
      btn_text: <>Browse Vacancies</>,
    },
    {
      title: "Resources & Forms",
      link: "/resources-and-forms",
      intro:
        "Locate general documents for use to handle internal and external affairs",
      btn_text: <>View Resources</>,
    },
  ];
  return (
    <>
      {modules.map((module, i) => (
        <div className="col-md-4 col-12" key={i}>
          <div className="card">
            <h6 className="text-center text-uppercase">{module.title}</h6>
            <p className="text-center">{module.intro}</p>
            <Link className="text-center home-btn-style" to={module.link}>
              {module.btn_text}&nbsp;
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Module;
