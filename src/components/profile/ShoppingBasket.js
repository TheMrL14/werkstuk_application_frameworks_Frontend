import { Button } from "@material-ui/core";
import React, { Component } from "react";
import BasketContext from "../../BasketContext";
import ChargeForm from "./ChargeForm";
import { loadStripe } from "@stripe/stripe-js";
import PaymentAPI from "../../API/PaymentAPI";
import { Elements } from "@stripe/react-stripe-js";

export default class ShoppingBasket extends Component {
  state = {
    formIsShown: false,
    stripePromise: null,
  };

  handleClick = (basket) => {
    if (this.state.formIsShown) this.handleClose();
    console.log("klik");
    this.getKey(basket.totalPrice);
  };

  handleClose = () => {
    console.log("close");
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
                onClick={() => this.handleClick(basket)}
                style={{
                  backgroundColor: "#51538F",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                Buy
              </Button>
            </div>
            {this.state.formIsShown && this.state.stripePromise != null ? (
              <div
                onClick={() => this.handleClose(basket)}
                className="bgOverlay"
              >
                <ChargeForm promise={this.state.stripePromise}></ChargeForm>
              </div>
            ) : null}
            {}
          </>
        )}
      </BasketContext.Consumer>
    );
  }
  getKey = (price) => {
    const token = this.props.auth.getAccessToken();
    PaymentAPI.setup(token, price, (json) => {
      this.setState({
        stripePromise: loadStripe(json.stripePublicKey),
        totalPrice: json.amount,
        formIsShown: true,
      });
    });
  };
}
