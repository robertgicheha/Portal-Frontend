import React from "react";
import { Link } from "react-router-dom";
import banner from "../../images/banners/xmasbanner2.jpg";
import Moment from "react-moment";

const ChristmasBanner = ({ voucher }) => {
  // Handle loading/empty state: render nothing
  if (!voucher || (Array.isArray(voucher) && voucher.length === 0)) return null;

  // Normalize (API might return array or object)
  const v = Array.isArray(voucher) ? voucher[0] : voucher;

  // Helper: safely get option name
  const getOptionName = () => {
    const { optionSelected, optionAvailable = [] } = v;
    const selected = optionAvailable.find((o) => o.code === optionSelected);
    return selected ? selected.name : "Unknown Option";
  };

  return (
    <div
      className="xmas-banner"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
      }}
    >
      <h5>Christmas Voucher</h5>
      {v.optionSelected ? (
        <h6>
          You have chosen <br />
          {getOptionName()}
        </h6>
      ) : (
        <h6>Have you selected yours?</h6>
      )}
      <p>
        {v.optionSelected
          ? "You will be notified when it is ready for collection"
          : "Deadline is"}{" "}
        {/* {v.applicationDeadline && (
          <Moment format="Do MMM YYYY">
            <u>{v.applicationDeadline}</u>
          </Moment>
        )} */}
      </p>
      <br />
      {/* <Link to="/choose-supermarket">
        {v.optionSelected ? "Update" : "Choose"} supermarket
      </Link> */}
      <hr />
    </div>
  );
};

export default ChristmasBanner;
