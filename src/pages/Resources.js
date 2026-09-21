import React, { useContext, useEffect } from "react";
import Menu from "../components/layout/Menu";
import BreadCrumb from "../components/sections/BreadCrumb";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
// import HowToSearch from "../components/sections/howto/HowToSearch";
import Header from "../components/layout/Header";
import ResourceForms from "../components/sections/resources/ResourceForms";

const Resources = () => {
  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Resources & Forms",
    subTitle: "Find all company documentation",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the
          getUserDetails()/etc. calls that flip isLoading, so gating it on
          isLoading itself creates a mount -> fetch -> hide -> resolve ->
          remount -> refetch loop whenever that fetch keeps failing. */}
      <Header />
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading your profile info" />
        </div>
      )}
      {!isLoading && (
        <div className="page">
          <div className="container staff">
            <Menu menu={menu} />
            <BreadCrumb />
            {/* <HowToSearch handleSearch={handleSearch} /> */}
            <ResourceForms />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Resources;
