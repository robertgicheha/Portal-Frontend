import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { Edit, Trash2 } from "react-feather";

const DependentView = ({ setaddDependant, dependant_count }) => {
  const { dependant_info, getAllDependents } = useContext(GlobalContext);

  useEffect(() => {
    getAllDependents();

    return () => {};
  }, []);

  const KinSection = ({ k, i }) => {
    return (
      <>
        <div className="kin_div col-md-4 col-12" key={i}>
          <p>
            <span>
              {k.kin_surname}&nbsp;{k.kin_othername}
            </span>
            <br />
            {k.relation}
          </p>
        </div>
        <div className="kin_div col-md-3 col-12">
          <p>
            <u>Contact info:</u>
            <br />
            {k.kin_home_no ? k.kin_home_no : "Not Set"}
            &nbsp;/&nbsp;
            {k.kin_office_no ? k.kin_office_no : "Not Set"}
          </p>
        </div>
        <div className="kin_div col-md-3 col-12">
          <p>
            <u>Address:</u>
            <br />
            {k.kin_address ? k.kin_address : "Not Set"}
          </p>
        </div>
        <div className="kin_div col-md-1 col-12">
          {/* <button
            style={{ float: "right" }}
            onClick={(e) => {
              e.preventDefault();
              // setediting(l.LineNo);
            }}
          >
            <Edit size={12} />
            &nbsp;edit
          </button> */}
        </div>
        <div className="col-md-12 col-12">
          <br />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row content">
        <div className="col-12">
          <h6>
            Dependents
            {dependant_info.length < 35 && (
              <button onClick={() => setaddDependant(true)}>
                Add Dependent
              </button>
            )}
          </h6>
          <hr />
        </div>
        {dependant_info.length > 0 ? (
          <>
            {dependant_info.map((k, i) => (
              <KinSection k={k} i={i} key={i} />
            ))}
          </>
        ) : (
          <>
            <div className="kin_div col-md-12 col-12">
              {dependant_count > 0 ? (
                <div className="alert alert-info text-center">
                  You have {dependant_count} dependants waiting to be approved
                  by HR
                </div>
              ) : null}

              {dependant_count < 1 ? (
                <p>You do not have any dependents listed</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DependentView;
