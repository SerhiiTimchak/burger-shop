import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliaru/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderedSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import SuccessMsg from "../../components/UI/SuccessMsg/SuccessMsg";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1.1,
    purchaseble: false,
    purchasing: false,
    loading: false,
    successfulPurchase: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  modalClosed = () => {
    this.setState({ purchasing: false });
  };

  updatePurchase = upgratedIngredients => {
    const ingAmount = Object.keys(upgratedIngredients)
      .map(igKey => {
        return upgratedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseble: ingAmount > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const upgratedIngredients = {
      ...this.state.ingredients
    };
    upgratedIngredients[type] = updateCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.updatePurchase(upgratedIngredients);
    this.setState({ totalPrice: newPrice, ingredients: upgratedIngredients });
  };

  remuveIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const upgratedIngredients = {
      ...this.state.ingredients
    };
    upgratedIngredients[type] = updateCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.updatePurchase(upgratedIngredients);
    this.setState({ totalPrice: newPrice, ingredients: upgratedIngredients });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
    console.log(queryString);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  closeMsgHandler = () => {
    setTimeout(() => {
      this.setState({ successfulPurchase: false });
    }, 1000);
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients cannot be retrieved</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            remuveIngredient={this.remuveIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            isPurchaseble={this.state.purchaseble}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
    }

    let orderSummary = null;

    if (this.state.ingredients) {
      orderSummary = (
        <OrderedSummary
          price={this.state.totalPrice}
          ingList={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxiliary>
        <Modal loadingSpinner={this.state.loading} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
