import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";
import Overview from "../components/sections/out_of_office/Overview";

const OutOfOffice = () => {
  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Out of Office",
    subTitle: "Manage out of office requests",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      { url: "/out-of-office", text: "Out of Office", access: 1 },
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

export default OutOfOffice;
