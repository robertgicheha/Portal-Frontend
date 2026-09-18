import React, { useEffect, useContext } from "react";
import Menu from "../components/layout/Menu";
import { User } from "react-feather";
import BreadCrumb from "../components/sections/BreadCrumb";
import Header from "../components/layout/Header";
import { GlobalContext } from "../context/GlobalState";
import UserInfo from "../components/sections/profile/UserInfo";

const Profile = () => {
  const {
    userDetailsToUpdate,
    user_info_to_update,
    unsetSlip,
    update_status,
    getLeaveDetails,
    leave_info,
    globals,
  } = useContext(GlobalContext);

  const menu = {
    title: "Profile",
    subTitle: "Manage your personal information",
    links: [{ url: "/profile", text: "Profile", icon: <User size={13} /> }],
  };

  useEffect(() => {
    userDetailsToUpdate();
    getLeaveDetails();

    return () => {
      // second;
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <Menu menu={menu} />
          <BreadCrumb />
          <div className="row">
            <div className="col-md-8 col-12 profile">
              <UserInfo
                user_info={user_info_to_update}
                leave_info={leave_info}
                unsetSlip={unsetSlip}
                update_status={update_status}
                globals={globals}
              />
            </div>
            {/* <GeneralInfo leave_info={leave_info} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
