import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import LeaveOverview from "../components/sections/leave/Overview";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";

const LeaveManagement = (props) => {
  const {
    message,
    leave_info,
    getLeaveDetails,
    leave_history,
    getLeaveHistory,
    isLoading,
    getLeaveApprovals,
  } = useContext(GlobalContext);

  useEffect(() => {
    getLeaveDetails();
    getLeaveHistory();
    getLeaveApprovals(); // eslint-disable-next-line
  }, []);

  const menu = {
    title: "Leave Management",
    subTitle: "Manage leave on the go with our easy tool",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the data
          fetches that flip isLoading, so gating it on isLoading itself
          creates a mount -> fetch -> hide -> resolve -> remount loop
          whenever that fetch keeps failing. */}
      <Header />
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading leave modules" />
        </div>
      )}
      {!isLoading && (
        <div className="page">
          <div className="container">
            <Menu menu={menu} />
            <LeaveOverview
              message={message}
              leave_info={leave_info}
              leave_history={leave_history}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveManagement;
