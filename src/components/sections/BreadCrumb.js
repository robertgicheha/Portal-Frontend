import React, { useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const BreadCrumb = () => {
  const { setMessage } = useContext(GlobalContext);

  const path = window.location.pathname;

  useEffect(() => {
    setMessage();

    // eslint-disable-next-line
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const crumbList = (path) => {
    const nonemptylinks = path.split("/").filter((link) => link !== "");

    return nonemptylinks;
  };

  const prevModule = () => {
    const link = path.split("/");

    if (link.length === 3) {
      return "/" + link[1];
    } else {
      return path;
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row row-no-padding">
          <div className="col-md-10 col-11">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {path === "/" && (
                  <li className="breadcrumb-item">
                    <Link to="/">Welcome to your dashboard</Link>
                  </li>
                )}
                {path !== "/" && (
                  <>
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    {crumbList(path).map((link, i) => (
                      <li className="breadcrumb-item" key={i}>
                        {i === 0 ? (
                          <Link to={prevModule(link)}>
                            {capitalizeFirstLetter(link).replace(/-/g, " ")}
                          </Link>
                        ) : (
                          <>{capitalizeFirstLetter(link).replace(/-/g, " ")}</>
                        )}
                      </li>
                    ))}
                  </>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(BreadCrumb);
