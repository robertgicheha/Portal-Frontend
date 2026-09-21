import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Overview from "../components/sections/hr/Overview";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";

const HrManagement = (props) => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const menu = {
    title: "HR Management",
    subTitle: "Manage staff information and leave application",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      //   { url: "/leave/requests", text: "Requests", access: 1 },
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
            <Overview />
          </div>
        </div>
      )}
    </>
  );
};

export default HrManagement;
