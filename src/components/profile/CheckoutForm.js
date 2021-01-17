import React from "react";
import { Component } from "react";
import PaymentAPI from "../../API/PaymentAPI";
import { ElementsConsumer } from "@stripe/react-stripe-js";

let _clientSecret;
class CheckoutForm extends Component {
  getKey = () => {
    const { auth } = this.props;

    const token = auth.getAccessToken();
    console.log(this.props.total);
    PaymentAPI.getClientSecret(token, this.props.total, (json) => {
      _clientSecret = json.client_secret;
      this.setState({ totalPrice: this.props.total, formIsShown: true });
    });
  };
  componentDidMount = () => {
    this.getKey();
  };

  error = () => {};

  render() {
    const { stripe } = this.props;

    return (
      <form className="overlay" onSubmit={this.handlePayment}>
        <div className="form-row">
          <label>
            Name
            <input name="accountholder-name" placeholder="Jenny Rosen" />
          </label>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="paybtn" disabled={!stripe}>
            Submit Payment
          </button>
        </div>
      </form>
    );
  }

  handlePayment = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      console.log("stripe bestaat niet");
      return;
    }

    const accountholderName = event.target["accountholder-name"];
    const { error } = await stripe.confirmBancontactPayment(_clientSecret, {
      payment_method: {
        billing_details: {
          name: accountholderName.value,
        },
      },
      return_url: "http://localhost:3000/callbackPayment",
    });
    console.log(accountholderName + " Gaat Betalen");

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }
  };
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} {...props} />
      )}
    </ElementsConsumer>
  );
}
