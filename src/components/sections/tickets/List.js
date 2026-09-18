import React from "react";
import Menu from "../../layout/Menu";

const List = () => {
  const menu = {
    title: "Profile",
    subTitle: "Manage your details",
    links: [
      { url: "/profile", text: "Personal" },
      { url: "/financial", text: "Financial" },
    ],
  };

  return (
    <>
      <Menu menu={menu} />
      <div className="page">
        <div className="container">
          <div className="row">lorem12</div>
        </div>
      </div>
    </>
  );
};

export default List;
