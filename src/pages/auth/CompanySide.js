import React from "react";
import bg from "../../images/intro2.jpg";
import logo from "../../images/logos/logo.png";

const CompanySide = () => {
  return (
    <div
      className="company-side"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="company">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default CompanySide;
