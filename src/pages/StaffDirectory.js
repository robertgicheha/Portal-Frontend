import { useContext, useEffect } from "react";
import Menu from "../components/layout/Menu";
import BreadCrumb from "../components/sections/BreadCrumb";
// import AllStaff from "../components/sections/staff-directory/AllStaff";
// import SearchStaff from "../components/sections/staff-directory/SearchStaff";
import Department from "../components/sections/staff-directory/Department";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Header from "../components/layout/Header";

const StaffDirectory = () => {
  // const [state, setstate] = useState({
  //   toggle_department: false,
  // });

  const { staff, getStaff, isLoading } = useContext(GlobalContext);

  useEffect(() => {
    getStaff(); // eslint-disable-next-line
  }, []);

  // const toggleDepartment = () => {
  //   setstate({
  //     toggle_department: !state.toggle_department,
  //   });
  // };

  // const { toggle_department } = state;

  const menu = {
    title: "Staff Directory",
    subTitle: "Find and contact collegues",
    links: [
      //   { url: "/leave/overview", text: "Overview", access: 2 },
      //   { url: "/leave/apply", text: "Apply Leave", access: 2 },
      //   { url: "/leave/requests", text: "Requests", access: 1 },
    ],
  };

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the data
          fetches that flip isLoading, so gating it on isLoading itself
          creates a mount -> fetch -> hide -> resolve -> remount loop
          whenever that fetch keeps failing. */}
      <Header />
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading staff information" />
        </div>
      )}
      {!isLoading && (
        <>
          <Menu menu={menu} />
          <div className="page">
            <div className="container staff">
              <BreadCrumb />
              <>
                <Department staff={staff} />
              </>
              {/* <SearchStaff
                toggleDepartment={toggleDepartment}
                show_departments={toggle_department}
              /> */}

              {/* {!toggle_department && (
                <>
                  <AllStaff staff={staff} />
                </>
              )}
              {toggle_department && (
                <>
                  <Department staff={staff} />
                </>
              )} */}
              {/* {window.user} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StaffDirectory;
