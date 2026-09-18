import React from "react";
import { Edit, Trash2 } from "react-feather";
import moment from "moment";

const List = ({ l, setediting }) => {
  return (
    <div className="single-education">
      <div className="row py-2">
        <div className="col-md-9 col-12">
          <div className="list-education">
            <h6>
              {l.Achievement}
              <br />
              <span>{l.Institution}</span>
              <br />
              <span>
                {moment(l.StartDate).format("YYYY")}&nbsp;-&nbsp;
                {moment(l.EndDate).format("YYYY")}
              </span>
            </h6>
          </div>
        </div>
        <div className="col-md-2 col-5">
          <button
            className="btn-list-education"
            style={{ float: "right" }}
            onClick={(e) => {
              e.preventDefault();
              setediting(l.LineNo);
            }}
          >
            <Edit size={12} />
            &nbsp;edit
          </button>
        </div>
        {/* <div className="col-md-2 col-5">
          <button
            className="btn-list-education"
            style={{ float: "right" }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Trash2 size={12} />
            &nbsp;delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default List;
