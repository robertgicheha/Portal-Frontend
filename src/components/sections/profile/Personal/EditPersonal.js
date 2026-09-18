import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Edit } from "react-feather";
import moment from "moment";
// import default_image from "../../../images/me.png";
import { marital_status } from "../../../../utils/helpers";

const EditCompanyInfo = ({
  user_info,
  seteditPersonal,
  updateProfile,
  globals,
  isUpdatingProfile,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const [profPic, setprofPic] = useState(null);
  const [file, setFile] = useState(undefined);
  const [marriageCertificate, setMarriageCertificate] = useState(false);

  const onSubmit = (data) => {
    let inputs = {};

    inputs.username = globals.username;

    inputs.picture = file;

    inputs.f_name = data["f_name"];
    inputs.m_name = data["m_name"];
    inputs.l_name = data["l_name"];
    inputs.gender = data["gender"];
    inputs.dob = moment(data["dob"]).format("YYYY-MM-DD");
    inputs.national_id = data["national_id"];
    inputs.status = data["status"];

    inputs.address = user_info.Address;
    inputs.city = user_info.City;
    inputs.postal_code = user_info.Pcode;
    inputs.p_email = user_info.Email;
    inputs.company_email = user_info.CompanyEmail;
    inputs.title = user_info.Title;
    inputs.p_phone = user_info.Phone;
    inputs.ext = user_info.Ext;
    inputs.job_title = user_info.JobTitle;
    inputs.position = user_info.Pos;
    inputs.residency = user_info.ResAddr;
    inputs.department = user_info.Dept;

    updateProfile(inputs);
    reset();
  };

  const checkDocumentation = (selected) => {
    console.log(selected);
    let status;

    if (selected === "2") {
      status = true;
    } else {
      status = false;
    }

    setMarriageCertificate(status);
  };

  useEffect(() => {
    // dateOfBirth(moment(user_info.BDate).format("DD/MM/YYYY"));
    return () => {
      setprofPic(null);
      setFile(undefined);
    };
    // eslint-disable-next-line
  }, []);

  const the_date = new Date(
    user_info.BDate ? user_info.BDate.substring(0, 10) : "0000-00-00"
  );

  const handleImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setprofPic(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
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
        <div className="col-md-12 col-12 my-2">
          <div className="prof_box">
            {profPic != null && (
              <div className="default_prof">
                <img src={profPic} alt="" />
              </div>
            )}
            {profPic === null && (
              <div className="file_input">
                <label>
                  <Edit size={20} />
                  &nbsp;Add profile picture
                  <input type="file" accept="image/*" onChange={handleImage} />
                </label>
              </div>
            )}
          </div>
          {!isUpdatingProfile && (
            <>
              {profPic !== null && (
                <span className="change-prof-btn">
                  <label>
                    Change picture
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                </span>
              )}
            </>
          )}
        </div>
        <hr />
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="First Name">First Name</label>
          <br />
          <input
            name="f_name"
            type="text"
            ref={register({
              required: "Please enter first name",
            })}
            defaultValue={user_info.FirstName || ""}
            placeholder="Enter first name"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.f_name && errors.f_name.message}
          </span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="Middle Name">Middle Name</label>
          <br />
          <input
            name="m_name"
            type="text"
            ref={register({
              required: "Please enter middle name",
            })}
            defaultValue={user_info.MiddleName || ""}
            placeholder="Enter your middle name"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.m_name && errors.m_name.message}
          </span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="Last Name">Last Name</label>
          <br />
          <input
            name="l_name"
            type="text"
            ref={register({
              required: "Please enter last name",
            })}
            defaultValue={user_info.LastName || ""}
            placeholder="Enter your last name"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.l_name && errors.l_name.message}
          </span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="Gender">Gender</label>
          <br />
          <select name="gender" ref={register} disabled={isUpdatingProfile}>
            {user_info.Gender === 1 ? (
              <option value="1">Female</option>
            ) : (
              <option value="2">Male</option>
            )}
            {user_info.Gender !== 1 ? (
              <option value="1">Female</option>
            ) : (
              <option value="2">Male</option>
            )}
          </select>
          <span className="err_msg">
            {errors.gender && errors.gender.message}
          </span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="Date of birth">Date of birth (MM/DD/YYYY)</label>
          <br />
          <DatePicker
            name="dob"
            ref={register({
              required: "Please enter date of birth",
            })}
            defaultValue={the_date}
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">{errors.dob && errors.dob.message}</span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="National ID">National ID</label>
          <br />
          <input
            name="national_id"
            type="text"
            ref={register({
              required: "Please enter national id",
            })}
            defaultValue={user_info.ID || ""}
            placeholder="Enter your national id"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.national_id && errors.national_id.message}
          </span>
        </div>
        <div className="col-md-4 col-12 my-1">
          <label htmlFor="Marital Status">Marital Status</label>
          <br />
          <select
            name="status"
            ref={register}
            disabled={isUpdatingProfile}
            onChange={(e) => {
              checkDocumentation(e.target.value);
            }}
          >
            {marital_status
              .filter((s, i) => i === user_info.Status)
              .map((filteredStatus, i) => (
                <option key={i} value={filteredStatus.value}>
                  {filteredStatus.name}
                </option>
              ))}

            {marital_status
              .filter((s, i) => i !== user_info.Status)
              .map((filteredStatus, i) => (
                <option key={i} value={filteredStatus.value}>
                  {filteredStatus.name}
                </option>
              ))}
          </select>
          <span className="err_msg">
            {errors.l_name && errors.l_name.message}
          </span>
        </div>
        <div className="col-md-8 col-12 my-1"></div>
        <div className="col-md-4 col-12 my-1">
          {marriageCertificate && (
            <>
              <div className="prof_box">
                <div className="file_input">
                  <label>
                    <Edit size={20} />
                    &nbsp;Upload certificate
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              </div>
              <br />
            </>
          )}
        </div>
        <div className="col-md-12 col-12"></div>
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
                seteditPersonal(false);
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
