// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { GlobalContext } from "../context/GlobalState";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isLoggedin } = useContext(GlobalContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (isLoggedin) {
//           return <Component {...props} {...rest} />;
//         } else {
//           return (
//             <Redirect
//               to={{ pathname: "/signin", state: { from: props.location } }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Cookies.get("refresh_token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);
