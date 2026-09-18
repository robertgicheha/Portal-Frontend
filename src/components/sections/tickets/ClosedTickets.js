import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import LoaderScreen from "../../../pages/LoaderScreen";
import Menu from "../../layout/Menu";
import Header from "../../layout/Header";
import BreadCrumb from "../../sections/BreadCrumb";

import Overview from "./Overview";

const ClosedTickets = (props) => {
  const { message, isLoading } = useContext(GlobalContext);

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

  const records = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
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
                    <section className="intro-ticket">
                      <div className="search">
                        <input
                          type="text"
                          placeholder={"Search ticket history by ref no."}
                        />
                      </div>
                    </section>
                    <table className="table table-striped table-collapse">
                      <thead>
                        <tr>
                          <th>#ref</th>
                          <th>Created On</th>
                          <th>Description</th>
                          <th>Priority</th>
                          <th colSpan="2">User acceptance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((r, i) => (
                          <tr>
                            <td>RQ-000004</td>
                            <td>14 Tue, June, 2021</td>
                            <td>Change member name</td>
                            <td>High</td>
                            <td>Pending</td>
                            <td>
                              <button>View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default ClosedTickets;
