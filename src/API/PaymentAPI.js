import PATHS from "../PATHS";
import Client from "./Client";

export default class UserAPI {
  static setup = (token, callback) => {
    Client.authenticatedGetMethod(PATHS.PAYMENT, token, callback);
  };

  static getClientSecret = (token, amount, callback) => {
    Client.authenticatedGetMethod(
      PATHS.PAYMENT + "/clientSecret?amount=" + amount,
      token,
      callback
    );
  };

  static checkIntent = (token, path, callback) => {
    Client.authenticatedGetMethod(path, token, callback);
  };
}
