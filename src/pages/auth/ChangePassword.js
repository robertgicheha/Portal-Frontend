import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context/GlobalState";
import Loader from "react-loader-spinner";
import AuthHeader from "./AuthHeader";
import CompanySide from "./CompanySide";

const ChangePassword = () => {
  const { loadingStatus, isLoading, updatePassword, setMessage, isLoggedin } =
    useContext(GlobalContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    loadingStatus(true);
    updatePassword(data);
  };

  if (isLoggedin) {
    let to = "/";

    if (localStorage.location) {
      to = JSON.parse(localStorage.location);
    }
    return <Redirect to={to} />;
  } else {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="auth-card">
              <CompanySide />
              <div className="auth-side">
                <AuthHeader instruction="Please change your password before proceeding" />
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <input
                        name="password"
                        type="password"
                        onChange={() => setMessage("")}
                        ref={register({
                          required: "Password cannot be empty",
                        })}
                        placeholder="Enter new password"
                      />
                      <span className="err_msg">
                        {errors.password && errors.password.message}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <input
                        name="conf_password"
                        type="password"
                        ref={register({
                          required: "Please confirm password",
                        })}
                        placeholder="Confirm your new password"
                      />
                      <span>
                        {errors.conf_password && errors.conf_password.message}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
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
                          "CHANGE PASSWORD"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default withRouter(ChangePassword);
