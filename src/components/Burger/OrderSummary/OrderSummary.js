import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliaru/Auxiliary";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    // console.log("[OrderSummary] WillUpdate");
  }

  render() {
    let listItems = Object.keys(this.props.ingList).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>
          <span className={classes.ingAmount}>{this.props.ingList[igKey]}</span>
        </li>
      );
    });
    return (
      <Auxiliary>
        <h2>Your order</h2>
        <p className={classes.Burger_desc}>
          A delicious burger with the following ingredients:
        </p>
        <ul className={classes.OrderedList}>{listItems}</ul>
        <p>Continue to Checout?</p>
        <p>
          <strong>Totoal price: {this.props.price.toFixed(2)} $</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

// const orderSummary = props => {
//   // let listItems = Object.keys(props.ingList).map(igKey => {
//   //   return (
//   //     <li key={igKey}>
//   //       <span style={{ textTransform: "capitalize" }}>{igKey}</span>
//   //       <span className={classes.ingAmount}>{props.ingList[igKey]}</span>
//   //     </li>
//   //   );
//   // });
//   // return (
//   //   <Auxiliary>
//   //     <h2>Your order</h2>
//   //     <p className={classes.Burger_desc}>
//   //       A delicious burger with the following ingredients:
//   //     </p>
//   //     <ul className={classes.OrderedList}>{listItems}</ul>
//   //     <p>Continue to Checout?</p>
//   //     <p>
//   //       <strong>Totoal price: {props.price.toFixed(2)} $</strong>
//   //     </p>
//   //     <Button btnType="Danger" clicked={props.purchaseCanceled}>
//   //       CANCEL
//   //     </Button>
//   //     <Button btnType="Success" clicked={props.purchaseContinued}>
//   //       CONTINUE
//   //     </Button>
//   //   </Auxiliary>
//   // );
// };

export default OrderSummary;
