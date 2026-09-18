import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";

const QuickHowTos = () => {
  const quicks = [
    {
      title: "How to apply and submit leave application",
      link: "/how-to/apply-leave",
      btn_text: "Go through steps",
    },
    {
      title: "Quick access to Covid-19 office guidlines",
      link: "/how-to/covid19",
      btn_text: "Read through guidelines",
    },
    {
      title: "Complete guide to raising tickets for staff",
      link: "/how-to",
      btn_text: "Go through steps",
    },
    // {
    //   title: "Dos and Donts while in the office environment",
    //   link: "/how-to/dos-donts",
    //   btn_text: "Read through guidelines",
    // },
    // {
    //   title: "How to handle office equipment in and out of office",
    //   link: "/how-to/office-equipment",
    //   btn_text: "Read through guidelines",
    // },
  ];
  return (
    <>
      <div className="row modules">
        {quicks.map((q, i) => (
          <div className="col-md-4 col-12" key={i}>
            <div className="card">
              <h6>{q.title}</h6>
              <p>
                <Link to={q.link}>
                  <ExternalLink size={14} />
                  &nbsp;{q.btn_text}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      <br />
    </>
  );
};

export default QuickHowTos;
