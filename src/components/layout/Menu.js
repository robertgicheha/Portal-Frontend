import React, { useState, useEffect, useContext } from "react";
// import LogOut from "../../pages/auth/Logout";
import { Link } from "react-router-dom";
// import Hamberger from "./Hamberger";
import { GlobalContext } from "../../context/GlobalState";

const Menu = ({ menu }) => {
  const [state, setState] = useState({
    menu_open: false,
  });

  const { globals } = useContext(GlobalContext);

  const path = window.location.pathname;

  useEffect(() => {
    setState({
      ...state,
      menu_open: false,
    }); // eslint-disable-next-line
  }, []);

  const toggleMenu = () => {
    setState({
      ...state,
      menu_open: !state.menu_open,
    });
  };

  const normalLinks = menu.links.filter(
    (item) => item.access === 2 || item.access === 0
  );

  const adminLinks = menu.links.filter((item) => item.access === 1);

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
