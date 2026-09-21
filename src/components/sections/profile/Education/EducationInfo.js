import React from "react";
import List from "./List";
import Add from "./Add";
import Update from "./Update";

const EducationInfo = ({
  seteditPersonal,
  seteditContact,
  seteditCompany,
  addEducation,
  setaddEducation,
  addQualification,
  qualifications,
  setediting,
  editing,
  isUpdatingProfile,
}) => {
  return (
    <>
      <div className="col-md-12 col-12">
        <h6>
          Education Information
          {editing === null && (
            <button
              onClick={() => {
                seteditPersonal(false);
                seteditContact(false);
                seteditCompany(false);
                setaddEducation(true);
              }}
            >
              {!addEducation && <>Add Education</>}
            </button>
          )}
        </h6>
        <hr />
      </div>
      <section className="multi-step">
        {editing !== null ? (
          <Update
            qualifications={qualifications}
            editing={editing}
            setediting={setediting}
            addQualification={addQualification}
            isUpdatingProfile={isUpdatingProfile}
            setaddEducation={setaddEducation}
          />
        ) : (
          <>
            {addEducation ? (
              <Add
                setaddEducation={setaddEducation}
                addQualification={addQualification}
                isUpdatingProfile={isUpdatingProfile}
              />
            ) : (
              <>
                {qualifications.map((l, i) => (
                  <List l={l} key={i} setediting={setediting} />
                ))}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default EducationInfo;
