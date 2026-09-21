import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoaderScreen from "./LoaderScreen";
import Menu from "../components/layout/Menu";
import Header from "../components/layout/Header";
import BreadCrumb from "../components/sections/BreadCrumb";
import { Bar, Pie } from "react-chartjs-2";

const Attendance = () => {
  const weekly_attendance_data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Total worked hours per day",
        data: [8.5, 9, 7, 12, 9, 0, 0],
        backgroundColor: [
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
          "rgb(0, 98, 204, 1)",
        ],
        borderColor: [
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgb(0, 98, 204, 0.2)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const doughnutPieData = {
    datasets: [
      {
        data: [16, 112, 16],
        backgroundColor: [
          "rgba(255,5,0 , 1)",
          "rgb(0, 98, 204, 1)",
          "rgba(123,255,0, 1)",
        ],
        borderColor: [
          "rgba(255,5,0 , 0.2)",
          "rgb(0, 98, 204, 0.2)",
          "rgba(123,255,0, 0.2)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Absent", "Present", "Leave"],
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const { userDetailsToUpdate } =
    useContext(GlobalContext);

  const { isLoading } = useContext(GlobalContext);

  const menu = {
    title: "Staff Attendance",
    subTitle: "Manage attendance",
    links: [
      // { url: "/leave/overview", text: "Overview", access: 2 },
      // { url: "/leave/apply", text: "Apply Leave", access: 2 },
      { url: "/staff-attendance", text: "Attendance", access: 1 },
    ],
  };

  useEffect(() => {
    userDetailsToUpdate();

    return () => {
      // second;
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Header renders unconditionally: it's what triggers the data
          fetches that flip isLoading, so gating it on isLoading itself
          creates a mount -> fetch -> hide -> resolve -> remount loop
          whenever that fetch keeps failing. */}
      <Header />
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading leave modules" />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="page">
            <div className="container">
              <Menu menu={menu} />
              <BreadCrumb />
              <div className="row leave" style={{ marginBottom: "30px" }}>
                <div className="col-md-3 col-12">
                  <div className="overview">
                    <span>AVERAGE CLOCK IN TIME</span>
                    <h1>8:45 AM</h1>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="overview">
                    <span>AVERAGE CLOCK OUT TIME</span>
                    <h1>5:30 PM</h1>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="overview">
                    <span>AVERAGE WORKING HOURS</span>
                    <h1>8 hrs</h1>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="overview">
                    <span>LATNESS COUNT</span>
                    <h1>0</h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="bar_attendance">
                    <div
                      style={{
                        height: "250px",
                        width: "90%",
                        margin: "0 auto",
                        paddingTop: "5%",
                      }}
                    >
                      <Pie
                        data={doughnutPieData}
                        options={doughnutPieOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-12">
                  <div className="bar_attendance">
                    <div
                      style={{
                        height: "250px",
                        width: "90%",
                        margin: "0 auto",
                        paddingTop: "2%",
                      }}
                    >
                      <Bar data={weekly_attendance_data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Attendance;
