import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    // console.log(props.ingredients);
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredients.map(ig => {
          return (
            <span
              style={{
                textTransform: "capitalaze",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
              }}
              key={ig.name}
            >
              {ig.name} ({ig.amount})
            </span>
          );
        })}
      </p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
