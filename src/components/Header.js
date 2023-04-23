import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
    </div>
  );
};

export default Header;
