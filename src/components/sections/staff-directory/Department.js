import React from "react";
import { PhoneCall, Mail, Smartphone } from "react-feather";
import Profile from "../../../images/prof.png";

const Department = ({ staff }) => {
  const departments = [
    { id: "00", name: "CEO" },
    { id: "01", name: "Director" },
    { id: "02", name: "Manager" },
    { id: "03", name: "Accounts" },
    { id: "04", name: "Information Technology" },
    { id: "05", name: "Business Development Team" },
    { id: "06", name: "Agents" },
    { id: "07", name: "Claims/Preauthorization Team" },
    { id: "08", name: "Care Management Team" },
    { id: "09", name: "Client Relationship Team" },
    { id: "10", name: "Direct Settlement Network" },
    { id: "11", name: "Policy Administration" },
    { id: "12", name: "Human Resource" },
    { id: "13", name: "Surbodinate Staff" },
    { id: "14", name: "Personal Assistant" },
    { id: "15", name: "Reception" },
  ];

  const getMembersByDepartment = (code) => {
    const members = staff.filter((s, i) => s.department === code);
    return members;
  };

  return (
    <>
      <hr />
      {departments.sort().map((department, i) => (
        <>
          <h6>{department.name}</h6>
          <div className="row">
            {getMembersByDepartment(department.id).length > 0 ? (
              <>
                {getMembersByDepartment(department.id).map((m, i) => (
                  <div className="col-md-3 col-12">
                    <div className="contact_card">
                      <div className="pic">
                        <img src={Profile} alt="" />
                      </div>
                      <div className="name_title">
                        <h6>
                          {m.name}
                          {/* <br />
                          <span>{department.name}</span> */}
                          <hr />
                          <span>
                            <Mail size={12} />
                            &nbsp;:&nbsp;
                            <b>{m.mail ? <>{m.phone}</> : <>Not set</>}</b>
                          </span>
                          <br />
                          <span>
                            <Smartphone size={12} />
                            &nbsp;:&nbsp;
                            <b>{m.phone ? <>{m.phone}</> : <>Not set</>}</b>
                          </span>
                          <br />
                          <span>
                            <PhoneCall size={12} />
                            &nbsp;:&nbsp;
                            <b>{m.extension ? <>{m.phone}</> : <>Not set</>}</b>
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="col-md-3 col-12">
                  <p>No entry</p>
                </div>
              </>
            )}
          </div>
          <hr />
        </>
      ))}
    </>
  );
};

export default Department;
