import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context/GlobalState";
import Loader from "react-loader-spinner";
import AuthHeader from "./AuthHeader";
import CompanySide from "./CompanySide";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "react-feather";

const Password = () => {
  const {
    message,
    setMessage,
    loadingStatus,
    isLoading,
    handleLogin,
    isLoggedin,
    loginStatus,
  } = useContext(GlobalContext);

  const [showHelp, setshowHelp] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setshowHelp(false);
    setMessage("");

    loadingStatus(true);
    setMessage();
    handleLogin(data);
  };

  useEffect(() => {
    loginStatus();
    // eslint-disable-next-line
  }, [isLoggedin]);

  if (isLoggedin) {
    let to = "/";
    return <Redirect to={to} />;
  } else {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="auth-card">
              <CompanySide />
              <div className="auth-side">
                <AuthHeader instruction="Please provide your password" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-12 col-12">
                      <label>Password</label>
                    </div>
                    <div className="col-md-12 col-12">
                      <span className="err_msg">{message}</span>
                      <span className="err_msg">
                        {errors.password && errors.password.message}
                      </span>
                    </div>
                    <div className="col-12">
                      <div className="password_box">
                        <input
                          name="password"
                          type={passwordShown ? "text" : "password"}
                          onChange={() => setMessage("")}
                          ref={register({
                            required: "Password cannot be empty",
                          })}
                          placeholder="Enter password here"
                        />
                        <div className="the_eye">
                          {!passwordShown ? (
                            <EyeOff
                              onClick={() => setPasswordShown(!passwordShown)}
                              style={{ cursor: "pointer" }}
                              size={17}
                            />
                          ) : (
                            <Eye
                              onClick={() => setPasswordShown(!passwordShown)}
                              style={{ cursor: "pointer" }}
                              size={17}
                            />
                          )}
                        </div>
                      </div>
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
                          "LOGIN"
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
                      <u>I dont know my password</u>&nbsp;
                      {showHelp ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}
                    </button>
                  </div>
                  <div className="col-12">
                    <p className={showHelp ? "" : "hide"}>
                      Use your office machine's password
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
};

// export default withRouter(Password);
export default Password;
