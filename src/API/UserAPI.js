import PATHS from "../PATHS";
import Client from "./Client";

const idAuthPart = "google-oauth2|";
const idAuthPart2 = "auth0|";

export default class UserAPI {
  static findUserById = (id, token, callback) => {
    let newId = id.replace(idAuthPart, "");
    newId = newId.replace(idAuthPart2, "");
    Client.authenticatedGetMethod(PATHS.USER + "/" + newId, token, callback);
  };

  static postUserToDB = (user, token, callback) => {
    user.id = user.id.replace(idAuthPart, "");
    user.id = user.id.replace(idAuthPart2, "");
    Client.postMethod(PATHS.CREATE_USER, user, token, callback);
  };

  static checkAndCreateUser = (user, token, callback) => {
    let newId = user.id.replace(idAuthPart, "");
    newId = newId.replace(idAuthPart2, "");
    this.findUserById(newId, token, (json) => {
      if (json == null) this.postUserToDB(user, token, callback);
    });
    //this.findUserById(user.id, token, {});
  };
}
