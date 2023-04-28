import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Header />
      This is About page
      <Outlet />
    </div>
  );
};

export default About;
