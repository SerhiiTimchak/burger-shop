import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <a className={classes.Rotate_center} href="/">
      <img src={burgerLogo} alt="MyBurger" />
    </a>
  </div>
);

export default logo;
