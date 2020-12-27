import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PaymentAPI from "../API/PaymentAPI";
//import { Redirect } from "react-router-dom";

let isDone = false;

export default class CallbackPayment extends Component {
  componentDidMount = () => {
    var params = window.location.search;
    let path = "http://localhost:8080/payment/charge/" + params;
    PaymentAPI.checkIntent(this.props.auth.getAccessToken(), path, (json) => {
      if (json.status === "succeeded") isDone = true;
    });
  };

  render() {
    return (
      <>
        {isDone ? (
          <div>
            <h1 className="loading">Loading...</h1>
          </div>
        ) : (
          <div>
            <h1 className="loading">Payment succeeded</h1>
          </div>
        )}
      </>
    );
  }
}
