import React from "react";
import { Animated } from "react-animated-css";
import prof_bg from "../../../images/prof_bg.jpg";
import user_img from "../../../images/user.png";

const ProfilePicture = ({ staff }) => {
  // const userProfile = () => {
  //   const img_url =
  //     process.env.PUBLIC_URL + `documents/${staff}/profile/${staff}.png`;

  //   return img_url;
  // };

  const showDefault = (e) => {
    e.target.src = process.env.PUBLIC_URL + `documents/defaults/user.png`;
  };

  return (
    <Animated className="row mb-3 content">
      <div className="col-md-12 col-12">
        <div
          className="profile_lg_card"
          style={{
            backgroundImage: `url(${prof_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="profile_holder">
          <img onError={(e) => showDefault(e)} src={user_img} alt="" />
        </div>
      </div>
    </Animated>
  );
};

export default ProfilePicture;
