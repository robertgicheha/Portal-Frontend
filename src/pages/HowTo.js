import React, { useContext, useEffect } from "react";
import Menu from "../components/layout/Menu";
import BreadCrumb from "../components/sections/BreadCrumb";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
// import HowToSearch from "../components/sections/howto/HowToSearch";
import QuickHowTos from "../components/sections/howto/QuickHowTos";
import Header from "../components/layout/Header";

const HowTo = () => {
  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Learn how to",
    subTitle: "Find any information you might need",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the data
          fetches that flip isLoading, so gating it on isLoading itself
          creates a mount -> fetch -> hide -> resolve -> remount loop
          whenever that fetch keeps failing. */}
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
            <QuickHowTos />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default HowTo;
