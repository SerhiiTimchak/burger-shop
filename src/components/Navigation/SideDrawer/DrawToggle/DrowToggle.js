import React from "react";
import classes from "./DrawToggle.module.css";

const drowToggle = props => {
  return (
    <button className={classes.MenuBtn} onClick={props.clicked}>
      <span></span>
    </button>
  );
};

export default drowToggle;
