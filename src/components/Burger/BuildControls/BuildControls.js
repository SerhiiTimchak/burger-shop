import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current prise: <strong>{props.price.toFixed(2)}</strong>$
    </p>
    {controls.map(ctrl => {
      return (
        <BuildControl
          disabled={props.disabled[ctrl.type]}
          label={ctrl.label}
          key={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          remuve={() => props.remuveIngredient(ctrl.type)}
        />
      );
    })}
    <button
      disabled={!props.isPurchaseble}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      <span className={props.isPurchaseble ? classes.Blink_me : null}>
        ORDER NOW
      </span>
    </button>
  </div>
);

export default buildControls;
