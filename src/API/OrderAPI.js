import PATHS from "../PATHS";
import Client from "./Client";

const idAuthPart = "google-oauth2|";

export default class UserAPI {
  static findOrderByClientId = (id, token, callback) => {
    let newId = id.replace(idAuthPart, "");
    Client.authenticatedGetMethod(PATHS.USER + "/" + newId, token, callback);
  };

  static postOrderToDB = (order, token, callback) => {
    Client.postMethod(PATHS.PLACE_ORDER, order, token, callback);
  };
}
