import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";
import { ProtectedRoute } from "./components/ProtectedRoute";

// import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import LeaveManagement from "./pages/LeaveManagement";
import HrManagement from "./pages/HrManagement";
import Login from "./pages/auth/Login";
import FeatureNotFound from "./pages/FeatureNotFound";
import StaffDirectory from "./pages/StaffDirectory";
import HowTo from "./pages/HowTo";
import Payslip from "./components/sections/profile/Salary/Payslip";
import SalaryAdvance from "./components/sections/profile/Salary/SalaryAdvance";
import EmployeeOrientation from "./pages/EmployeeOrientation";
import ArticleHowtoContent from "./components/sections/howto/ArticleHowtoContent";

import Footer from "./components/layout/Footer";
import Gallery from "./pages/Gallery";
import TicketOverview from "./pages/TicketOverview";
import Sick from "./components/sections/leave/application_types/Sick";
import Annual from "./components/sections/leave/application_types/Annual";
import Paternity from "./components/sections/leave/application_types/Paternity";
import Maternity from "./components/sections/leave/application_types/Maternity";
import Requests from "./components/sections/leave/Requests";
import RaiseTicket from "./components/sections/tickets/RaiseTicket";
import List from "./components/sections/tickets/List";
import PendingTickets from "./components/sections/tickets/PendingTickets";
import ClosedTickets from "./components/sections/tickets/ClosedTickets";
import AvailableTechnicians from "./components/sections/tickets/AvailableTechnicians";
import EhsEmployees from "./components/sections/hr/EhsEmployees";
import MicEmployees from "./components/sections/hr/MicEmployees";
import PickSupermarket from "./components/additions/PickSupermarket";
import PNine from "./components/sections/profile/P9Form/p9";
import Appraisal from "./pages/Appraisal";
import OutOfOffice from "./pages/OutOfOffice";
import Apply from "./components/sections/out_of_office/Apply";
import Objective from "./components/sections/appraisal/Objective";
import Development from "./components/sections/appraisal/Development";
import ManageObjectives from "./components/sections/appraisal/ManageObjectives";
import ManageDevelopment from "./components/sections/appraisal/ManageDevelopment";
import Attendance from "./pages/Attendance";

import Cookies from "js-cookie";

import InternalVacancies from "./pages/InternalVacancies";
import Resources from "./pages/Resources";
import JobDetails from "./components/sections/vacancies/JobDetails";
import SendApplication from "./components/sections/vacancies/SendApplication";

const App = (props) => {
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    // alert("Complete Cache Cleared");
  };

  const checkTokenAge = () => {
    // var token = Cookies.get("refresh_token");
    // if (token) {
    //   var secret = process.env.REACT_APP_SECRET;
    //   var decoded = jwt.decode(token, secret);
    //   console.log(new Date(decoded.exp * 1000));
    //   const difference = new Date(decoded.exp * 1000) - new Date();
    //   const days = Math.ceil(difference / (1000 * 3600 * 24));
    //   if (days > 1 || days < 1) {
    //     localStorage.clear();
    //     Cookies.remove("__details");
    //     Cookies.remove("__dependent_details");
    //     Cookies.remove("__kin_details");
    //     Cookies.remove("__leave_details");
    //     Cookies.remove("__leave_history");
    //     Cookies.remove("__leave_approvals");
    //     Cookies.remove("__ehs_staff");
    //     Cookies.remove("__mic_staff");
    //     Cookies.remove("refresh_token");
    //   }
    // }
  };

  useEffect(() => {
    // checkIdleness();

    checkTokenAge();

    clearCacheData();

    // location != "signin" &&

    let timeoutId = null;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        localStorage.clear();

        Cookies.remove("__details");
        Cookies.remove("__dependent_details");
        Cookies.remove("__kin_details");
        Cookies.remove("__leave_details");
        Cookies.remove("__leave_history");
        Cookies.remove("__leave_approvals");
        Cookies.remove("__ehs_staff");
        Cookies.remove("__mic_staff");
        Cookies.remove("appraisal_code");
        Cookies.remove("refresh_token");

        window.location.reload();
      }, 600000);
    };

    // Reset the timeout whenever there is user activity
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);
    document.addEventListener("scroll", resetTimeout);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
      document.removeEventListener("scroll", resetTimeout);
    };

    // return () => {};
  }, []);

  return (
    <Provider store={store}>
      <GlobalProvider>
        <Switch>
          <ProtectedRoute path="/" exact component={Dashboard} />
          <ProtectedRoute
            path="/choose-supermarket"
            exact
            component={PickSupermarket}
          />
          <Route path="/signin" exact component={Login} />
          <ProtectedRoute path="/gallery" exact component={Gallery} />
          <ProtectedRoute path="/messages" exact component={Messages} />
          <ProtectedRoute path="/leave" exact component={LeaveManagement} />
          <ProtectedRoute path="/hr/overview" exact component={HrManagement} />
          <ProtectedRoute path="/leave/requests" exact component={Requests} />
          <ProtectedRoute path="/leave/sick" exact component={Sick} />
          <ProtectedRoute path="/leave/annual" exact component={Annual} />
          <ProtectedRoute path="/leave/paternity" exact component={Paternity} />
          <ProtectedRoute path="/leave/maternity" exact component={Maternity} />
          <ProtectedRoute path="/profile/overview" exact component={Profile} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute path="/profile/payslip" exact component={Payslip} />
          <ProtectedRoute path="/profile/p9" exact component={PNine} />

          <ProtectedRoute
            path="/ticketing/raise"
            exact
            component={RaiseTicket}
          />

          <ProtectedRoute
            path="/ticketing/pending"
            exact
            component={PendingTickets}
          />

          <ProtectedRoute
            path="/ticketing/technicians"
            exact
            component={AvailableTechnicians}
          />

          <ProtectedRoute
            path="/ticketing/closed"
            exact
            component={ClosedTickets}
          />

          <ProtectedRoute path="/ticket/list" exact component={List} />

          <ProtectedRoute path="/ticketing" exact component={TicketOverview} />

          <ProtectedRoute
            path="/employee-orientation"
            exact
            component={EmployeeOrientation}
          />

          <ProtectedRoute
            path="/profile/salary-advance"
            exact
            component={SalaryAdvance}
          />

          <ProtectedRoute
            path="/resources-and-forms"
            exact
            component={Resources}
          />

          <ProtectedRoute path="/how-to" exact component={HowTo} />

          <ProtectedRoute
            path="/how-to/:article"
            exact
            component={ArticleHowtoContent}
          />

          <ProtectedRoute
            path="/staff-directory"
            exact
            component={StaffDirectory}
          />

          <ProtectedRoute path="/staff-appraisal" exact component={Appraisal} />

          <ProtectedRoute
            path="/staff-attendance"
            exact
            component={Attendance}
          />

          <ProtectedRoute path="/out-of-office" exact component={OutOfOffice} />
          <ProtectedRoute path="/out-of-office/apply" exact component={Apply} />

          <ProtectedRoute
            path="/staff-appraisal/objectives"
            exact
            component={Objective}
          />

          <ProtectedRoute
            path="/staff-appraisal/development"
            exact
            component={Development}
          />

          <ProtectedRoute
            path="/staff-appraisal/manage-objectives"
            exact
            component={ManageObjectives}
          />

          <ProtectedRoute
            path="/staff-appraisal/manage-development"
            exact
            component={ManageDevelopment}
          />

          <ProtectedRoute path="/hr/ehs" exact component={EhsEmployees} />

          <ProtectedRoute path="/hr/mic" exact component={MicEmployees} />

          <ProtectedRoute
            path="/internal-vacancies"
            exact
            component={InternalVacancies}
          />

          <ProtectedRoute
            path="/internal-vacancies/:jobID"
            exact
            component={JobDetails}
          />

          <ProtectedRoute
            path="/internal-vacancies/details/:jobID"
            exact
            component={JobDetails}
          />

          <ProtectedRoute
            path="/internal-vacancies/apply/:jobID"
            exact
            component={SendApplication}
          />

          <Route exact path="/hr">
            <Redirect to="/hr/overview" />
          </Route>

          <ProtectedRoute component={FeatureNotFound} />
          <Route path="*" component={Login} />
        </Switch>
        <Footer />
      </GlobalProvider>
    </Provider>
  );
};

export default withRouter(App);
