import React, { useState, useEffect } from "react";
// import LogOut from "../../pages/auth/Logout";
// import Hamberger from "./Hamberger";

const Menu = ({ menu }) => {
  const [state, setState] = useState({
    menu_open: false,
  });

  useEffect(() => {
    setState({
      ...state,
      menu_open: false,
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="menu row">
        <div className="col-md-4 col-10">
          <h4 className="the_title">
            <b>{menu.title}</b>
          </h4>
          <p className="mg-b-0">{menu.subTitle && <>{menu.subTitle}</>}</p>
        </div>
        {/* <div className="col-2 mobile_hamburger">
          <button onClick={() => toggleMenu()}>
            <Hamberger />
          </button>
        </div> */}
      </div>
      {/* <div className="row mobile_hamburger">
        {state.menu_open && (
          <nav>
            <ul>
              {normalLinks.map((link, i) => (
                <li key={i}>
                  <Link className={link.url === path && "active"} to={link.url}>
                    {link.icon}&nbsp;
                    {link.text}
                  </Link>
                </li>
              ))}

              {globals.role === 1 && (
                <>
                  {adminLinks.map((a, i) => (
                    <li key={i}>
                      <Link className={a.url === path && "active"} to={a.url}>
                        {a.icon}&nbsp;
                        {a.text}
                      </Link>
                    </li>
                  ))}
                </>
              )}
              <li className="mobile_sign_out">
                <LogOut />
              </li>
            </ul>
          </nav>
        )}
      </div> */}
    </>
  );
};

export default Menu;
