import React from "react";
import classes from "./SuccessMsg.module.css";
import acceptIcon from "../../../assets/images/accept-icon.png";

const successMsg = props => {
  return (
    <p className={classes.SuccessMsg} onClick={props.closeMsg}>
      The order has been sent
      <img width="25" height="25" src={acceptIcon} alt="accept icon" />
    </p>
  );
};

export default successMsg;
