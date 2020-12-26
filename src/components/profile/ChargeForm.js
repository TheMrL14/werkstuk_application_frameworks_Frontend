import React from "react";
import { Component } from "react";

import { Elements } from "@stripe/react-stripe-js";

export default class ChargeForm extends Component {
  render() {
    let promise = this.props.promise;
    if (!promise) return null;
    console.log("gelukt");
    return (
      <div className="overlay">
        <Elements stripe={promise}>
          <h1>TEST</h1>
          <button role="link">Checkout</button>
        </Elements>
      </div>
    );
  }
}
