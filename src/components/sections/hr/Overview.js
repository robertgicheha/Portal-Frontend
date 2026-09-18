import React, { useEffect, useContext } from "react";
import { ArrowRightCircle } from "react-feather";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import user from "../../../images/user.jpg";
import { GlobalContext } from "../../../context/GlobalState";

const Overview = () => {
  const { ehs_staff, getEhsStaff, mic_staff, getMicStaff } =
    useContext(GlobalContext);

  useEffect(() => {
    getMicStaff();
    getEhsStaff();

    // eslint-disable-next-line
  }, []);

  const notifications = [
    { message: "Nelson updated their first name" },
    { message: "James changed their profile picture" },
    { message: "Nelson added a new dependant" },
    { message: "Getrude updated their next of kin" },
  ];
  return (
    <>
      <BreadCrumb />
      <div className="row leave">
        <div className="col-md-8 col-12">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="overview">
                <span>
                  <b>EMPLOYEES MIC</b>
                </span>
                <h1>
                  {mic_staff.length}
                  <Link to="/hr/mic">
                    Manage&nbsp;
                    <ArrowRightCircle size={16} />
                  </Link>
                </h1>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="overview">
                <span>
                  <b>EMPLOYEES EHS</b>
                </span>
                <h1>
                  {ehs_staff.length}
                  <Link to="/hr/ehs">
                    Manage&nbsp;
                    <ArrowRightCircle size={16} />
                  </Link>
                </h1>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="overview">
                <span>
                  <b>NEW EMPLOYEES</b>
                </span>
                <h1>
                  6
                  <Link to="/hr/new-employees">
                    View employees&nbsp;
                    <ArrowRightCircle size={16} />
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="overview">
            <span>RECENT PROFILE UPDATES</span>
            <ul className="items">
              {notifications.map((n, i) => (
                <li>
                  <div className="listing">
                    <div
                      className="person"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <Link to="" className="person-detail">
                      {n.message}
                      <br />
                      <span>Click to approve</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
