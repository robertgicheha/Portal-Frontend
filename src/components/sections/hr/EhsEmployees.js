import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Menu from "../../../components/layout/Menu";
import Header from "../../../components/layout/Header";
import BreadCrumb from "../BreadCrumb";
import user from "../../../images/user.png";

const EhsEmployees = () => {
  const { ehs_staff, getEhsStaff, isLoading } = useContext(GlobalContext);

  useEffect(() => {
    getEhsStaff(); // eslint-disable-next-line
  }, []);

  const menu = {
    title: "HR Management",
    subTitle: "Manage MIC staff",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      // { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row">
            <div className="col-md-12 col-12">
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            {isLoading ? (
              <>Loading</>
            ) : (
              <>
                {ehs_staff
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((e, i) => (
                    <div className="col-md-3 col-12" key={i}>
                      <button className="employee-card">
                        <div
                          className="pic"
                          style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className="name_title">
                          <h6>
                            {e.name}
                            <br />
                            <span>Web Developer</span>
                          </h6>
                        </div>
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EhsEmployees;
