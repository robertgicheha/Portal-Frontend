import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";
import BreadCrumb from "../components/sections/BreadCrumb";
// import { Link } from "react-router-dom";
// import { Search } from "react-feather";
// import user from "../images/prof.png";
import moment from "moment";
import Overview from "../components/sections/tickets/Overview";
// import TicketSearch from "../components/sections/tickets/TicketSearch";

const TicketOverview = (props) => {
  const { isLoading, tickets, allTickets } = useContext(GlobalContext);

  useEffect(() => {
    allTickets();
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
                    {tickets.length > 0 ? (
                      <>
                        {/* <section className="intro-ticket">
                          <TicketSearch />
                        </section> */}
                        <table className="table table-striped table-collapse mb-5">
                          <thead>
                            <tr>
                              <th>#ref</th>
                              <th>Created On</th>
                              <th>Description</th>
                              <th>Ticket Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tickets.map((t, i) => (
                              <tr key={i}>
                                <td style={{ width: "200px" }}>{t.No}</td>
                                <td style={{ width: "200px" }}>
                                  {moment(t.DateCreated).format("ddd")},&nbsp;
                                  {moment(t.DateCreated).format("LL")}
                                </td>
                                <td style={{ width: "600px" }}>
                                  {t.DescriptionOfChange1}
                                </td>
                                <td style={{ width: "200px" }}>Open</td>
                                <td>
                                  <button>View</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>No records founds</>
                    )}
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

export default TicketOverview;
