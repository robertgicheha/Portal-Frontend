import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, X, Edit } from "react-feather";
import _ from "lodash";

const Add = ({ setaddEducation, addQualification, isUpdatingProfile }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    data["line_no"] = 1;
    addQualification(data);
    reset();
  };

  const [startYear, setStartYear] = useState(1960);

  const [attachments, setAttachments] = useState([]);

  const handleChangeFile = (e) => {
    console.log(e.target.files);

    setAttachments(e.target.files);
  };

  return (
    <>
      <form className="row px-2" onSubmit={handleSubmit(onSubmit)}>
        {isUpdatingProfile && (
          <div className="col-md-12 col-12">
            <div className="alert alert-info text-center">
              Please wait... adding your qualification
            </div>
          </div>
        )}
        <div className="col-md-6 col-12">
          <label htmlFor="Qualification Type">Qualification Type</label>
          <br />
          <select
            name="qualification_type"
            ref={register({
              required: "Please enter start date",
            })}
            disabled={isUpdatingProfile}
          >
            <option value="1">Academic</option>
            <option value="2">Professional</option>
            <option value="3">Technical</option>
            <option value="0">Other</option>
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
            <option value="0">Short course</option>
            <option value="1">Long course</option>
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
            defaultValue={""}
            placeholder="Enter your achievement"
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
            defaultValue={""}
            placeholder="Enter your institution's name"
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
            disabled={isUpdatingProfile}
            onChange={(e) => {
              setStartYear(e.target.value);
            }}
          >
            {_.range(1900, 2021, 1).map((_n, i) => (
              <option value={_n} key={i}>
                {_n}
              </option>
            ))}
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
            {_.range(startYear, 2021, 1).map((_n, i) => (
              <option value={_n} key={i}>
                {_n}
              </option>
            ))}
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
            defaultValue={"0.00"}
            placeholder="0.00"
            disabled={isUpdatingProfile}
          />
          <span className="err_msg">
            {errors.grade && errors.grade.message}
          </span>
        </div>
        <div className="col-md-12 col-12">
          <br />
          <div className="prof_box">
            <div className="file_input">
              <label>
                <Edit size={20} />
                &nbsp;Upload certificate
                <input type="file" accept="image/*" />
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-12"></div>
        {/* <div className="col-md-12 col-12">
          <br />
          {attachments.length > 0 ? (
            <>
              <label htmlFor="Attach documents">
                {attachments.length} attachment is ready for upload
              </label>
              <div className="row">
                <div className="col-md-3 col-5">
                  <div className="pdf-preview">
                    <div className="overlay"></div>
                    <div className="main-preview">
                      <button onClick={() => setAttachments([])}>
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="Attach documents">
                Attach documents (If aplicable)
              </label>
              <div className="attach-document">
                <label>
                  <UploadCloud size={50} color={"#5a5a5a"} strokeWidth={1} />
                  <input
                    type="file"
                    name="file"
                    accept=".pdf"
                    onChange={(e) => handleChangeFile(e)}
                    multiple
                  />
                </label>
              </div>
            </>
          )}
        </div> */}
        <div className="col-md-6 col-12 my-3">
          <input
            type="submit"
            className="btn btn-success update_changes"
            value="Add"
          />
          &nbsp;&nbsp;
          <button
            className="btn btn-danger update_changes"
            onClick={(e) => {
              e.preventDefault();
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

export default Add;
