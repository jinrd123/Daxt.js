import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import styles from "./style.css";
import useStyles from "isomorphic-style-loader/useStyles";

const About = () => {
  useStyles(styles);
  return (
    <div className={styles.test}>
      <Header />
      This is About page
      <Outlet />
    </div>
  );
};

export default About;
