import React from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

const EditContact = ({
  user_info,
  seteditContact,
  updateProfile,
  globals,
  isUpdatingProfile,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    let inputs = {};

    inputs.username = globals.username;

    inputs.p_email = data["p_email"];
    inputs.p_phone = data["p_phone"];
    inputs.city = data["city"];
    inputs.postal_code = data["postal_code"];
    inputs.residency = data["residency"];

    inputs.status = user_info.Status;
    inputs.f_name = user_info.FirstName;
    inputs.m_name = user_info.MiddleName;
    inputs.l_name = user_info.LastName;
    inputs.dob = moment(user_info.BDate).format("YYYY-MM-DD");
    inputs.gender = user_info.Gender;
    inputs.national_id = user_info.ID;
    inputs.address = user_info.Address;

    inputs.company_email = user_info.CompanyEmail;
    inputs.title = user_info.Title;

    inputs.ext = user_info.Ext;
    inputs.job_title = user_info.JobTitle;
    inputs.position = user_info.Pos;
    inputs.department = user_info.Dept;

    updateProfile(inputs);

    reset();
  };

  return (
    <>
      <form className="row px-3" onSubmit={handleSubmit(onSubmit)}>
        {isUpdatingProfile && (
          <div className="col-md-12 col-12">
            <div className="alert alert-info text-center">
              Please wait... updating your Information
            </div>
          </div>
        )}
        <div className="col-md-6 col-12 my-1">
          <label htmlFor="First Name">Personal email</label>
          <br />
          <input
            name="p_email"
            type="text"
            ref={register({
              required: "Please enter personal email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address",
              },
            })}
            defaultValue={user_info.Email || ""}
            placeholder="Enter personal email"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.p_email && errors.p_email.message}
          </span>
        </div>
        <div className="col-md-6 col-12 my-1">
          <label htmlFor="Middle Name">Personal Mobile No.</label>
          <br />
          <input
            name="p_phone"
            type="text"
            ref={register({
              required: "Please enter mobile number name",
            })}
            defaultValue={user_info.Phone || ""}
            placeholder="Enter your mobile number"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.p_phone && errors.p_phone.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="City">City</label>
          <br />
          <input
            name="city"
            type="text"
            ref={register({
              required: "Please enter Postal Code",
            })}
            defaultValue={user_info.City || ""}
            placeholder="Enter city"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">{errors.city && errors.city.message}</span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Postal Address">Postal Address</label>
          <br />
          <input
            name="postal_code"
            type="text"
            ref={register({
              required: "Please enter Postal Code",
            })}
            defaultValue={user_info.Address || ""}
            placeholder="Enter personal postal code"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.postal_code && errors.postal_code.message}
          </span>
        </div>
        <div className="col-md-12 col-12">
          <label htmlFor="Last Name">Residential Area</label>
          <br />
          <textarea
            name="residency"
            type="text"
            ref={register({
              required: "Please area of residency",
            })}
            defaultValue={user_info.ResAddr || ""}
            placeholder="Enter residential area"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.residency && errors.residency.message}
          </span>
        </div>
        {!isUpdatingProfile && (
          <div className="col-md-6 col-12 my-3">
            <input
              type="submit"
              className="btn btn-success update_changes"
              value="Save"
            />
            &nbsp;&nbsp;
            <button
              className="btn btn-danger update_changes"
              onClick={(e) => {
                e.preventDefault();
                seteditContact(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default EditContact;
