import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";
import Overview from "../components/sections/appraisal/Overview";

const Appraisal = () => {
  const { userDetailsToUpdate, user_info_to_update, globals, user_info } =
    useContext(GlobalContext);

  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Staff Appraisal",
    subTitle: "Manage Objectives & Development Needs",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      { url: "/staff-appraisal", text: "Appraisal", access: 1 },
    ],
  };

  useEffect(() => {
    userDetailsToUpdate();

    return () => {
      // second;
    };

    // eslint-disable-next-line
  }, []);

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
              <Overview user_info={user_info_to_update} globals={globals} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Appraisal;
