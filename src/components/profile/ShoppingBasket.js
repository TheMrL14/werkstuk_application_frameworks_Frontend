import { Button } from "@material-ui/core";
import React, { Component } from "react";
import BasketContext from "../../BasketContext";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I2FQ9B9G0CsXo9KU6AlFK1uPcyv4xguDDmfcf08isL05zTXjcAxAHmMJ3s4i0ZRjrY6qbMIaHOPbz92VHEbUQu400lmuGs2G8"
);

export default class ShoppingBasket extends Component {
  state = {
    formIsShown: false,
  };

  componentDidMount = () => {};

  handleClick = (basket) => {
    if (this.state.formIsShown) this.handleClose();
    this.setState({ formIsShown: true });
  };

  handleClose = () => {
    this.setState({ formIsShown: !this.state.formIsShown });
  };

  render() {
    return (
      <BasketContext.Consumer>
        {(basket) => (
          <>
            <div className="content">
              {basket.items.items.map((i) => (
                <p>
                  {i.count}x {i.product.productName}
                </p>
              ))}

              <Button
                onClick={() => this.handleClick(basket.items.totalPrice)}
                style={{
                  backgroundColor: "#51538F",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                Buy
              </Button>
            </div>
            <Elements stripe={stripePromise}>
              {this.state.formIsShown ? (
                <div className="bgOverlay">
                  <CheckoutForm
                    auth={this.props.auth}
                    total={basket.items.totalPrice}
                  />
                </div>
              ) : null}
            </Elements>
          </>
        )}
      </BasketContext.Consumer>
    );
  }
}
