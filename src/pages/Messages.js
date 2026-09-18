import React from "react";
import { MessageSquare } from "react-feather";
import { User } from "react-feather";
import BreadCrumb from "../components/sections/BreadCrumb";
import Menu from "../components/layout/Menu";

const Messages = () => {
  const menu = {
    title: "Messages",
    subTitle: "Manage your personal information",
    links: [
      { url: "/messages", text: "Messages", icon: <MessageSquare size={13} /> },
      { url: "/profile", text: "Profile", icon: <User size={13} /> },
    ],
  };

  return (
    <>
      <Menu menu={menu} />
      <div className="page">
        <div className="container">
          <BreadCrumb />
          <div className="card generic-card px-3 py-3">
            <div className="row">
              <div className="col-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                quos consectetur quo culpa ea delectus dolorum labore. Repellat,
                eligendi aut! Alias, recusandae ad!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
