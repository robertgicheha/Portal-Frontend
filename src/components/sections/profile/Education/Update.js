import React, { useState } from "react";
import { useForm } from "react-hook-form";

import _ from "lodash";
import { qualification_type, course_type } from "../../../../utils/helpers";
import moment from "moment";

const Update = ({
  setediting,
  addQualification,
  editing,
  qualifications,
  isUpdatingProfile,
  setaddEducation,
}) => {
  const qualification = qualifications.filter(
    (itemInArray) => itemInArray.LineNo === editing
  );

  const [, setStartYear] = useState(1900);

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    addQualification(data);

    reset();
  };

  return (
    <>
      <form className="row px-2" onSubmit={handleSubmit(onSubmit)}>
        {isUpdatingProfile && (
          <div className="col-md-12 col-12">
            <div className="alert alert-info text-center">
              Please wait... update in progress
            </div>
          </div>
        )}
        <div className="col-md-6 col-12">
          <input
            type="hidden"
            name="line_no"
            ref={register()}
            defaultValue={editing}
          />
          <label htmlFor="Qualification Type">Qualification Type</label>
          <br />
          <select
            name="qualification_type"
            ref={register({
              required: "Please enter start date",
            })}
            disabled={isUpdatingProfile}
          >
            {qualification_type
              .filter((s, i) => i === qualification[0].QualificationType)
              .map((filteredQualification, i) => (
                <option key={i} value={i}>
                  {filteredQualification}
                </option>
              ))}

            {qualification_type
              .filter((s, i) => i !== qualification[0].QualificationType)
              .map((filteredQualification, i) => (
                <option key={i} value={i}>
                  {filteredQualification}
                </option>
              ))}
          </select>
          <span className="err_msg">
            {errors.job_title && errors.job_title.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Course Type">Course Type</label>
          <br />
          <select
            name="course_type"
            ref={register({
              required: "Please enter start date",
            })}
            disabled={isUpdatingProfile}
          >
            {course_type
              .filter((s, i) => i === qualification[0].CourseType)
              .map((filteredStatus, i) => (
                <option key={i} value={i}>
                  {filteredStatus}
                </option>
              ))}

            {course_type
              .filter((s, i) => i !== qualification[0].CourseType)
              .map((filteredStatus, i) => (
                <option key={i} value={i}>
                  {filteredStatus}
                </option>
              ))}
          </select>
          <span className="err_msg">
            {errors.job_title && errors.job_title.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Level of Education">
            Name of achievement (Degree/Diploma/Certificate in CII)
          </label>
          <br />
          <input
            name="achievement"
            type="text"
            ref={register({
              required: "Please enter achievement",
            })}
            defaultValue={qualification[0].Achievement}
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.achievement && errors.achievement.message}
          </span>
        </div>
        <div className="col-md-6 col-12">
          <label htmlFor="Level of Education">Name of Institution</label>
          <br />
          <input
            name="institution"
            type="text"
            ref={register({
              required: "Please enter institution's name",
            })}
            defaultValue={qualification[0].Institution}
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.institution && errors.institution.message}
          </span>
        </div>

        <div className="col-md-3 col-12">
          <label htmlFor="Start year">Start year</label>
          <br />
          <select
            name="startDate"
            ref={register({
              required: "Please enter start date",
            })}
            onChange={(e) => {
              setStartYear(e.target.value);
            }}
            disabled={isUpdatingProfile}
          >
            <option value={moment(qualification[0].StartDate).format("YYYY")}>
              {moment(qualification[0].StartDate).format("YYYY")}
            </option>
            {_.range(1900, 2021, 1).map(
              (_n, i) =>
                qualification[0].StartDate !== _n && (
                  <option value={_n} key={i}>
                    {_n}
                  </option>
                )
            )}
          </select>
          <span className="err_msg">
            {errors.startDate && errors.startDate.message}
          </span>
        </div>
        <div className="col-md-3 col-12">
          <label htmlFor="End year">End year</label>
          <br />
          <select
            name="endDate"
            ref={register({
              required: "Please enter end date",
            })}
            disabled={isUpdatingProfile}
          >
            <option value={moment(qualification[0].EndDate).format("YYYY")}>
              {moment(qualification[0].EndDate).format("YYYY")}
            </option>
            {_.range(1900, 2021, 1).map(
              (_n, i) =>
                qualification[0].EndDate !== _n && (
                  <option value={_n} key={i}>
                    {_n}
                  </option>
                )
            )}
            <option value="2009">2009</option>
          </select>
          <span className="err_msg">
            {errors.endDate && errors.endDate.message}
          </span>
        </div>
        <div className="col-md-3 col-12">
          <label htmlFor="Level of Education">Grade</label>
          <br />
          <input
            name="grade"
            type="text"
            ref={register({
              required: "Enter grade",
            })}
            defaultValue={qualification[0].Grade}
            placeholder="0.00"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.grade && errors.grade.message}
          </span>
        </div>
        <div className="col-md-12 col-12"></div>
        {/* <div className="col-md-12 col-12">
          <br />
          <label htmlFor="Attach documents">
            Attach documents (If aplicable)
          </label>
          <div className="attach-document">
            <label>
              <UploadCloud size={50} color={"#5a5a5a"} strokeWidth={1} />
              <input type="file" />
            </label>
          </div>
        </div> */}
        <div className="col-md-6 col-12 my-3">
          <input
            type="submit"
            className="btn btn-success update_changes"
            value="Update & Save"
            disabled={isUpdatingProfile}
          />
          &nbsp;&nbsp;
          <button
            className="btn btn-danger update_changes"
            disabled={isUpdatingProfile}
            onClick={(e) => {
              e.preventDefault();
              setediting(null);
              setaddEducation(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Update;
