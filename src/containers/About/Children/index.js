import React from "react";
import styles from "./style.css";
import useStyles from "isomorphic-style-loader/useStyles";

const AboutChildren = () => {
  useStyles(styles);
  return <div className={styles.test}>This is AboutChildren</div>;
};

export default AboutChildren;
