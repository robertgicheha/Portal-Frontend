import React, { useContext, useEffect } from "react";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../../../context/GlobalState";
import { Edit, Trash2 } from "react-feather";

const NextOfKinView = ({ setKin, next_of_kin_count }) => {
  const { next_of_kin, getAllNextOfKin } = useContext(GlobalContext);

  useEffect(() => {
    getAllNextOfKin();

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
            Next of Kin
            {next_of_kin.length < 37 && (
              <button onClick={() => setKin(true)}>Add Next of Kin</button>
            )}
          </h6>
          <hr />
        </div>
        {next_of_kin.length > 0 ? (
          <>
            {next_of_kin.map((k, i) => (
              <KinSection k={k} i={i} key={i} />
            ))}
          </>
        ) : (
          <>
            <div className="kin_div col-md-12 col-12">
              {next_of_kin_count > 0 ? (
                <div className="alert alert-info text-center">
                  You have {next_of_kin_count} dependants waiting to be approved
                  by HR
                </div>
              ) : null}

              {next_of_kin_count < 1 ? (
                <p>You do not have any next of kin listed</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NextOfKinView;
