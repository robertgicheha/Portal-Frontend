import React from "react";
import { Frown } from "react-feather";
import { Link } from "react-router-dom";

const NoRecord = ({ text, link, btn_text }) => {
  return (
    <>
      <div className="nothing">
        <div className="text_button">
          <Frown size={90} color="#6c757d" strokeWidth={1} />
          <h6>{text}</h6>
          <br />
          <Link to={link}>{btn_text}</Link>
        </div>
      </div>
    </>
  );
};

export default NoRecord;
