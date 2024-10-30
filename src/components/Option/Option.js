import React from "react";
import { Link } from "react-router-dom";
import "./option.css"; // Ensure to include the updated styles

const Option = () => {
  return (
    <div className="Option">
      <Link to="/" className="opt__link opt__form">
        Form
      </Link>
      <Link to="/data" className="opt__link opt__data">
        Data
      </Link>
    </div>
  );
};

export default Option;
