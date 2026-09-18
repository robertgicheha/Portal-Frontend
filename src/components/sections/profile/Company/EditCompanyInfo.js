import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { job_titles, position } from "../../../../utils/helpers";

const EditCompanyInfo = ({
  user_info,
  seteditCompany,
  updateProfile,
  globals,
  isUpdatingProfile,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    let inputs = {};

    inputs.username = globals.username;

    inputs.ext = data["ext"];
    inputs.job_title = data["job_title"];
    inputs.position = data["position"];

    // inputs.ext = 283;
    // inputs.job_title = "Web Developer";
    // inputs.position = "Employee";

    inputs.address = user_info.Address;
    inputs.city = user_info.City;
    inputs.postal_code = user_info.Pcode;
    inputs.p_email = user_info.Email;
    inputs.dob = moment(user_info.BDate).format("YYYY-MM-DD");
    inputs.gender = user_info.Gender;
    inputs.company_email = user_info.CompanyEmail;
    inputs.title = user_info.Title;
    inputs.p_phone = user_info.Phone;
    inputs.national_id = user_info.ID;
    inputs.status = user_info.Status;
    inputs.f_name = user_info.FirstName;
    inputs.m_name = user_info.MiddleName;
    inputs.l_name = user_info.LastName;
    inputs.residency = user_info.ResAddr;
    inputs.department = user_info.Dept;

    updateProfile(inputs);
    // reset();
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

        <div className="col-md-6 col-12">
          <label htmlFor="Job Title">Job Title</label>
          <br />
          <select
            name="job_title"
            ref={register({
              required: "Please enter job title",
            })}
            disabled={isUpdatingProfile}
          >
            {!user_info.JobTitle && <option value="">Choose job title</option>}
            {job_titles
              .filter((j, i) => j === user_info.JobTitle)
              .map((filteredJob, i) => (
                <option key={i} value={filteredJob}>
                  {filteredJob}
                </option>
              ))}

            {job_titles
              .filter((j, i) => j !== user_info.JobTitle)
              .map((filteredJob, i) => (
                <option key={i} value={filteredJob}>
                  {filteredJob}
                </option>
              ))}
          </select>
          <span className="err_msg">
            {errors.job_title && errors.job_title.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Position">Position</label>
          <br />
          <select
            name="position"
            ref={register({
              required: "Please enter position",
            })}
            disabled={isUpdatingProfile}
          >
            {!user_info.Pos && <option value="">Choose position</option>}

            {position
              .filter((j, i) => j === user_info.Pos)
              .map((filteredPos, i) => (
                <option key={i} value={filteredPos}>
                  {filteredPos}
                </option>
              ))}

            {position
              .filter((j, i) => j !== user_info.Pos)
              .map((filteredPos, i) => (
                <option key={i} value={filteredPos}>
                  {filteredPos}
                </option>
              ))}
          </select>
          <span className="err_msg">
            {errors.position && errors.position.message}
          </span>
        </div>
        <div className="col-md-12 col-12"></div>
        <div className="col-md-6 col-12">
          <label htmlFor="Company Email">Company email</label>
          <br />
          <input
            name="company_email"
            type="text"
            ref={register({
              required: "Please enter offical email",
            })}
            disabled={isUpdatingProfile}
            defaultValue={user_info.CompanyEmail}
            placeholder="Enter offical email"
          />
          <span className="err_msg">
            {errors.company_email && errors.company_email.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Surname">Office extension</label>
          <br />
          <input
            name="ext"
            type="text"
            ref={register({
              required: "Please enter office extension",
            })}
            defaultValue={user_info.Ext}
            placeholder="Enter office extension"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">{errors.ext && errors.ext.message}</span>
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
                seteditCompany(false);
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

export default EditCompanyInfo;
