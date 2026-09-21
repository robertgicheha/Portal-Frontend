import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { EditOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../../../context/GlobalState";

const AddNextOfKin = ({ setKin, isUpdatingProfile, update_code }) => {
  const relations = [
    "Son",
    "Daughter",
    "Sister",
    "Brother",
    "Mother",
    "Father",
    "Wife",
    "Husband",
    "Uncle",
    "Aunt",
    "Guardian",
  ];

  const { addNextOfKin } = useContext(GlobalContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    data.docNo = update_code;
    addNextOfKin(data);
  };

  return (
    <form className="row content" onSubmit={handleSubmit(onSubmit)}>
      {isUpdatingProfile && (
        <div className="col-md-12 col-12">
          <div className="alert alert-info text-center">
            Please wait... adding Kin
          </div>
        </div>
      )}
      <div className="col-md-12 col-12">
        <h6>
          <strong>
            <EditOutlined />
            &nbsp;Add next of kin
          </strong>
        </h6>
      </div>
      <div className="col-md-12 col-12">
        <hr />
      </div>
      <div className="col-md-4 col-12">
        <label htmlFor="Surname">Surname</label>
        <br />
        <input
          name="surname"
          type="text"
          ref={register({
            required: "Please enter surname",
          })}
          defaultValue={""}
          placeholder="Enter surname"
        />
        <span className="err_msg">
          {errors.surname && errors.surname.message}
        </span>
      </div>
      <div className="col-md-4 col-12">
        <label htmlFor="Other name">Other name</label>
        <br />
        <input
          name="other_name"
          type="text"
          ref={register({
            required: "Please enter other name",
          })}
          defaultValue={""}
          placeholder="Enter other name"
        />
        <span className="err_msg">
          {errors.other_name && errors.other_name.message}
        </span>
      </div>
      <div className="col-md-4 col-12">
        <label htmlFor="National ID">National ID</label>
        <br />
        <input
          name="national_id"
          type="text"
          ref={register({
            required: "Please enter national id",
          })}
          defaultValue={""}
          placeholder="Enter national id"
        />
        <span className="err_msg">
          {errors.national_id && errors.national_id.message}
        </span>
      </div>
      <div className="col-md-4 col-12">
        <label htmlFor="Date of birth">Date of birth</label>
        <br />
        <input
          name="dob"
          type="date"
          ref={register({
            required: "Please enter date of birth",
          })}
          defaultValue={""}
          placeholder="Enter date of birth"
        />
        <span className="err_msg">{errors.dob && errors.dob.message}</span>
      </div>
      <div className="col-md-4 col-12">
        <label htmlFor="Relation">Choose Relation</label>
        <br />
        <select
          name="relation"
          ref={register({
            required: "Please choose relation",
          })}
        >
          <option value="">Select</option>
          {relations.map((m, i) => (
            <option>{m}</option>
          ))}
        </select>
        <span className="err_msg">
          {errors.relation && errors.relation.message}
        </span>
      </div>
      <div className="col-md-12 col-12">
        <hr />
      </div>
      <div className="col-md-6 col-12">
        <label htmlFor="Office No.">Office No.</label>
        <br />
        <input
          name="office_no"
          type="text"
          ref={register()}
          defaultValue={""}
          placeholder="Enter office no."
        />
        <span className="err_msg">
          {errors.office_no && errors.office_no.message}
        </span>
      </div>
      <div className="col-md-6 col-12">
        <label htmlFor="Home No.">Home No.</label>
        <br />
        <input
          name="home_no"
          type="text"
          ref={register()}
          defaultValue={""}
          placeholder="Enter home no"
        />
        <span className="err_msg">
          {errors.home_no && errors.home_no.message}
        </span>
      </div>
      <div className="col-md-6 col-12">
        <label htmlFor="Occupation">Occupation</label>
        <br />
        <textarea
          name="occupation"
          type="text"
          ref={register()}
          defaultValue={""}
          placeholder="Enter occupation"
        />
        <span className="err_msg">
          {errors.occupation && errors.occupation.message}
        </span>
      </div>
      <div className="col-md-6 col-12">
        <label htmlFor="Address">Address</label>
        <br />
        <textarea
          name="address"
          type="text"
          ref={register()}
          defaultValue={""}
          placeholder="Enter address"
        />
        <span className="err_msg">
          {errors.address && errors.address.message}
        </span>
      </div>
      <div className="col-md-6 col-12">
        <br />
        <input
          type="submit"
          className="btn btn-success update_changes"
          value="Add"
        />
        &nbsp;&nbsp;
        <button
          onClick={() => setKin(false)}
          className="btn btn-danger update_changes"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNextOfKin;
