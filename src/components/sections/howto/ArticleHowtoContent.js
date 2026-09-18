import React, { useContext, useEffect, useState } from "react";
import Menu from "../../layout/Menu";
import BreadCrumb from "../BreadCrumb";
import { GlobalContext } from "../../../context/GlobalState";
import ApplyLeave from "./articles/ApplyLeave";
import Covid19 from "./articles/Covid19";
import Complaints from "./articles/Complaints";
import DosDonts from "./articles/DosDonts";
import OfficeGuidelines from "./articles/OfficeGuidelines";

const ArticleHowtoContent = (props) => {
  const [state, setstate] = useState({
    query: "",
    results: [],
  });

  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Learn how to",
    subTitle: "Find any information you might need",
    links: [],
  };

  const articleToLoad = () => {
    const module = props.match.params.article;

    switch (module) {
      case "apply-leave":
        return <ApplyLeave />;
      case "covid19":
        return <Covid19 />;
      case "complaints":
        return <Complaints />;
      case "dos-donts":
        return <DosDonts />;
      case "office-equipment":
        return <OfficeGuidelines />;
      default:
        return <h1>Choose article</h1>;
    }
  };

  useEffect(() => {
    articleToLoad();
  }, []);

  return (
    <>
      <Menu menu={menu} />
      <div className="page">
        <div className="container staff">
          <BreadCrumb />
          {articleToLoad()}
          <br />
        </div>
      </div>
    </>
  );
};

export default ArticleHowtoContent;
