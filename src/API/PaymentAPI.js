import PATHS from "../PATHS";
import Client from "./Client";

export default class UserAPI {
  static setup = (token, amount, callback) => {
    Client.authenticatedGetMethod(
      PATHS.PAYMENT + "?amount=" + amount,
      token,
      callback
    );
  };

  static charge = () => {};
}
