import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BreadCrumb from "../BreadCrumb";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "react-feather";
// import Report from "./Report";
import moment from "moment";

const Overview = ({ user_info, globals }) => {
  let start_year = moment(user_info.DateJoined)
    .format("DD/MM/YYYY")
    .split("/")[2];

  const [, setYear] = useState(2024);

  const setting = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <BreadCrumb />
      <div className="row leave">
        <div className="col-md-3 col-12">
          <div className="overview">
            <Link to="/staff-appraisal/objectives">
              My Objectives&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="overview">
            <Link to="/staff-appraisal/development">
              My Development Needs&nbsp;
              <ArrowRightCircle size={16} />
            </Link>
          </div>
        </div>
        {/* {globals.role === 1 && (
          <>
            <div className="col-md-3 col-12">
              <div className="overview">
                <Link to="/staff-appraisal/manage-objectives">
                  Manage Team Objectives&nbsp;
                  <ArrowRightCircle size={16} />
                </Link>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="overview">
                <Link to="/staff-appraisal/manage-development">
                  Manage Team Needs&nbsp;
                  <ArrowRightCircle size={16} />
                </Link>
              </div>
            </div>
          </>
        )} */}
      </div>
      <br />
      <div className="appraisal">
        <Slider {...setting}>
          <div className="appraisal-box">
            <span>General Progress Report</span>
            <h2>
              {new Date().getFullYear()} - {start_year}&nbsp;
            </h2>
            <button className="btn-overview" onClick={() => setYear(2024)}>
              View full report&nbsp;
              <ArrowRightCircle size={16} />
            </button>
          </div>
          <div className="appraisal-box">
            <span>Track your current progress</span>
            <h2>{new Date().getFullYear()}&nbsp;</h2>
            <button
              className="btn-overview"
              onClick={() => setYear(new Date().getFullYear())}
            >
              View progress&nbsp;
              <ArrowRightCircle size={16} />
            </button>
          </div>
          {[...Array(new Date().getFullYear() - start_year)].map((a, i) => (
            <div className="appraisal-box" key={i}>
              <span>Appraisal Report for year</span>
              <h2>{new Date().getFullYear() - (i + 1)}&nbsp;</h2>
              <button
                className="btn-overview"
                onClick={() => setYear(`${new Date().getFullYear() - (i + 1)}`)}
              >
                View full {new Date().getFullYear() - (i + 1)} report&nbsp;
                <ArrowRightCircle size={16} />
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {/* <div className="card mt-3 px-3 py-3">
        <Report year={year} />
      </div> */}
    </>
  );
};

export default Overview;
