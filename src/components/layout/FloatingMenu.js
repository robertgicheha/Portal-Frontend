import React from "react";

const FloatingMenu = ({
  floatingProperties,
  leave_approvals,
  notifications,
}) => {
  return (
    <>
      {/* {floatingProperties.toShow !== null && (
        <div
          className="floating"
          style={{
            marginLeft: floatingProperties.position,
          }}
        >
          <div className="arrow-up"></div>
          <div className="content">
            {floatingProperties.toShow === "requests" && (
              <>
                <ul className="unread">
                  <li>
                    <b>Leave Requests ({leave_approvals.length})</b>
                  </li>
                </ul>
                {leave_approvals.length > 0 && (
                  <>
                    <ul className="items">
                      {leave_approvals.map((l, i) => (
                        <li>
                          <div className="listing">
                            <div
                              className="person"
                              style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                            <div className="person-detail">
                              {l.name}
                              <br />
                              <span>
                                <b>Start Date:&nbsp;</b>
                                {moment(l.StartDate).format("dddd")}
                                ,&nbsp;{moment(l.StartDate).format("LL")}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <ul className="all">
                      <li>
                        <Link to="/leave/requests">View All Requests</Link>
                      </li>
                    </ul>
                  </>
                )}
              </>
            )}
            {floatingProperties.toShow === "manage" && (
              <>
                <ul className="unread">
                  <li>
                    <b>Staff Actions Required (3)</b>
                  </li>
                </ul>
                <ul className="items">
                  <li>
                    <div className="listing">
                      <div
                        className="person"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="person-detail">
                        Nelson updated their Profile
                        <br />
                        <span>
                          <Link to="">Verify changes</Link>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="listing">
                      <div
                        className="person"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="person-detail">
                        Nelson requested Annual Leave
                        <br />
                        <span>
                          <Link to="">Take action</Link>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="listing">
                      <div
                        className="person"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),url(${user})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="person-detail">
                        James updated their Profile
                        <br />
                        <span>
                          <Link to="">Verify changes</Link>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="all">
                  <li>
                    <Link to="/hr/overview">View all</Link>
                  </li>
                </ul>
              </>
            )}
            {floatingProperties.toShow === "announcement" && (
              <>
                <ul className="unread">
                  <li>
                    <b>You have {notifications} announcement</b>
                  </li>
                </ul>
                <ul className="items">
                  <li>
                    <Link to="/" className="listing">
                      <Users size={20} />
                      &nbsp; 3 new employees joined.
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="listing">
                      <Users size={20} />
                      &nbsp; 3 employees left.
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="listing">
                      <Flag size={20} />
                      &nbsp;&nbsp;New Covid guidlines.
                    </Link>
                  </li>
                </ul>
                <ul className="all">
                  <li>
                    <Link to="/">View all announcements</Link>
                  </li>
                </ul>
              </>
            )}
            {floatingProperties.toShow === "messages" && (
              <>
                <ul className="unread">
                  <li>
                    <b>You have 3 messages</b>
                  </li>
                </ul>
                <ul className="items">
                  <li>
                    <Link to="" className="listing">
                      <Check size={20} />
                      &nbsp; &nbsp;Your leave has been approved.
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="listing">
                      <Check size={20} />
                      &nbsp; &nbsp;Your ticket has been sorted.
                    </Link>
                  </li>
                </ul>
                <ul className="all">
                  <li>
                    <Link to="/leave/requests">View All Requests</Link>
                  </li>
                </ul>
              </>
            )}
            {floatingProperties.toShow === "help" && (
              <>
                <ul className="unread">
                  <li>
                    <b>Support Center</b>
                  </li>
                </ul>
                <ul className="items">
                  <li>
                    <Link to="/ticketing" className="listing">
                      <FileText size={20} />
                      &nbsp;&nbsp; View Tickets
                    </Link>
                  </li>
                  <li>
                    <Link to="/ticketing" className="listing">
                      <FileText size={20} />
                      &nbsp;&nbsp; Pending tickets
                    </Link>
                  </li>
                  <li>
                    <Link to="/ticketing" className="listing">
                      <FileText size={20} />
                      &nbsp;&nbsp; Raise ticket
                    </Link>
                  </li>
                </ul>
                <ul className="all">
                  <li>
                    <Link to="/ticketing">Take me to ticket center</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default FloatingMenu;
