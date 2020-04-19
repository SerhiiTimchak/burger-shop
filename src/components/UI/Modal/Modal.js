import React, { Component } from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliaru/Auxiliary";
import BackDrop from "../Backdrop/BackDrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    // console.log("[Modal] WillUpdate");
  }
  render() {
    return (
      <Auxiliary>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

// const modal = props => (
//   <Auxiliary>
//     <BackDrop show={props.show} clicked={props.modalClosed} />
//     <div
//       className={classes.Modal}
//       style={{
//         transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//         opacity: props.show ? "1" : "0"
//       }}
//     >
//       {props.children}
//     </div>
//   </Auxiliary>
// );

export default Modal;
