import React, { useContext, useState, useEffect } from "react";
import Menu from "../components/layout/Menu";
import BreadCrumb from "../components/sections/BreadCrumb";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
// import HowToSearch from "../components/sections/howto/HowToSearch";
import QuickHowTos from "../components/sections/howto/QuickHowTos";
import Header from "../components/layout/Header";
import ResourceForms from "../components/sections/resources/ResourceForms";

const Resources = () => {
  const [state, setstate] = useState({
    query: "",
    results: [],
  });

  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Resources & Forms",
    subTitle: "Find all company documentation",
    links: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = () => {
    //will handle the search
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="load_screen">
            <LoaderScreen text="Loading your profile info" />
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <Header />
          <div className="page">
            <div className="container staff">
              <Menu menu={menu} />
              <BreadCrumb />
              {/* <HowToSearch handleSearch={handleSearch} /> */}
              <ResourceForms />
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Resources;
