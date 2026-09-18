import React, { useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context/GlobalState";
import Loader from "react-loader-spinner";
import ChangePassword from "./ChangePassword";
import Password from "./Password";
import AuthHeader from "./AuthHeader";
import CompanySide from "./CompanySide";
import { ChevronDown, ChevronUp } from "react-feather";

const Login = () => {
  const [showHelp, setshowHelp] = useState(false);

  const {
    loadingStatus,
    isLoading,
    isLoggedin,
    message,
    setMessage,
    userCheck,
    checkUsername,
    shouldChangePassword,
  } = useContext(GlobalContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setshowHelp(false);
    setMessage("");

    const inputs = {
      email: data.email,
      // email: data.email.str.replace(/\s+/g, ""),
    };

    checkUsername(inputs);

    loadingStatus(true);
  };

  if (isLoggedin) {
    let to = "/";
    try {
      if (localStorage.getItem("location")) {
        to = JSON.parse(localStorage.getItem("location"));
      }
    } catch (e) {
      console.error("Invalid JSON in localStorage.location", e);
      to = "/";
    }

    // Force navigation
    window.location.assign(to); // Or use window.location.href = to;

    // return <Redirect to={to} />;
  } else {
    if (userCheck) {
      if (shouldChangePassword) {
        return <ChangePassword />;
      } else {
        return <Password />;
      }
    } else {
      return (
        <>
          <div className="page">
            <div className="container">
              <div className="auth-card">
                <CompanySide />
                <div className="auth-side">
                  <AuthHeader instruction="Sign in with your official work email to continue" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-12 col-12">
                        <label>Email</label>
                      </div>
                      <div className="col-md-12 col-12">
                        <span className="err_msg">{message}</span>
                        <span className="err_msg">
                          {errors.email && errors.email.message}
                        </span>
                      </div>
                      <div className="col-md-12 col-12">
                        <input
                          name="email"
                          type="text"
                          onChange={() => setMessage("")}
                          ref={register({
                            required: "Email field cannot be empty",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Enter a valid email address",
                            },
                          })}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={() => setshowHelp(false)}
                        >
                          {isLoading ? (
                            <Loader
                              type="Oval"
                              color="#fff"
                              secondaryColor="#FFFFFF"
                              height={23}
                              width={23}
                              //timeout={0} //3 secs
                            />
                          ) : (
                            "PROCEED"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="extra-btn"
                        onClick={() => setshowHelp(!showHelp)}
                      >
                        {showHelp ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        )}
                        &nbsp;I dont know my username
                      </button>
                    </div>
                    <div className="col-12">
                      <p className={showHelp ? "" : "hide"}>
                        Your email is the one used to access Microsoft Outlook
                        from the office
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};

export default Login;
