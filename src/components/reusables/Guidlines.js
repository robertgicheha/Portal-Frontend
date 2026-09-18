import React from "react";

const Guidelines = ({ title, guidelines = ["Guidelines will show here"] }) => {
  return (
    <div className="guidelines">
      <h6>{"Please note the following"}</h6>
      <ol>
        {guidelines.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ol>
    </div>
  );
};

export default Guidelines;
