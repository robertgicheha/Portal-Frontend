import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import LoaderScreen from "../../../pages/LoaderScreen";
import Menu from "../../layout/Menu";
import Header from "../../layout/Header";
import BreadCrumb from "../BreadCrumb";
import Overview from "./Overview";
import user from "../../../images/user.jpg";

const AvailableTechnicians = (props) => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const menu = {
    title: "Ticket Management",
    subTitle: "Manage my tickets",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      // { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  const it_department = [
    { name: "Allan Kahama", title: "IT Projects & Operations Manager" },
    { name: "John Muli", title: "I.T. Officer" },
    { name: "James Malelu", title: "Software Developer" },
    { name: "Lawrence G. Muriithi", title: "Software Developer" },
    { name: "Nelson Omoro", title: "Web Developer" },
    { name: "Desmond Okubasu", title: "Creative Coordinator" },
  ];

  return (
    <>
      {isLoading && (
        <>
          <div className="load_screen">
            <LoaderScreen text="Loading leave modules" />
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <Header />
          <div className="page">
            <div className="container">
              <Menu menu={menu} />
              <BreadCrumb />
              <Overview />
              <div className="row leave">
                <div className="col-md-12 col-12">
                  <div className="ticket-history">
                    <span>AVAILABLE TECHNICAL STAFF</span>
                    <ul className="items">
                      {it_department.map((n, i) => (
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
                            <div className="person-detail">
                              {n.name}
                              <br />
                              <span>{n.title}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
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

export default AvailableTechnicians;
