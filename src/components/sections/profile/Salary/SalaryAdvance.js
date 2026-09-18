import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import Menu from "../../../layout/Menu";
import Header from "../../../layout/Header";
import BreadCrumb from "../../BreadCrumb";
import LoaderScreen from "../../../../pages/LoaderScreen";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SalaryAdvance = () => {
  const { isLoading } = useContext(GlobalContext);

  const [state, setstate] = useState({
    preview: false,
  });

  const menu = {
    title: "Salary advance",
    subTitle: "Place request for salary advance",
    links: [
      // { url: "/messages", text: "Messages", icon: <MessageSquare size={13} /> },
      // { url: "/profile", text: "Profile", icon: <User size={13} /> },
    ],
  };

  const { register, handleSubmit, errors, reset } = useForm();

  const requestAdvance = () => {
    Swal.fire({
      icon: "info",
      html: "<h5>Feature is coming soon</h5>",
    });
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
            <div className="container">
              <Menu menu={menu} />
              <BreadCrumb />
              <div className="row">
                <div className="col-md-12 col-12 profile">
                  <div className="row content">
                    <div className="col-md-4 col-12">
                      <label htmlFor="Amount">Salary advance amount</label>
                      <br />
                      <input
                        name="amount"
                        type="number"
                        ref={register({
                          required: "Please provide an amount",
                        })}
                        defaultValue={""}
                        placeholder="Enter amount"
                      />
                    </div>
                    <br />
                    <div className="col-md-12 col-12">
                      <button
                        onClick={requestAdvance}
                        className="btn btn-success update_changes"
                      >
                        Request
                      </button>
                    </div>
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

export default SalaryAdvance;
