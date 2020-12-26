import PATHS from "../PATHS";
import Client from "./Client";

export default class UserAPI {
  static findUserById = (id, token, callback) => {
    Client.authenticatedGetMethod(PATHS.USER + "/" + id, token, callback);
  };

  static postUserToDB = (user, token, callback) => {
    Client.postMethod(PATHS.CREATE_USER, user, token, callback);
  };

  static checkAndCreateUser = (user, token, callback) => {
    this.findUserById(user.id, token, (json) => {
      if (json == null) this.postUserToDB(user, token, callback);
    });
    //this.findUserById(user.id, token, {});
  };
}
