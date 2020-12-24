import PATHS from "../PATHS";
import Client from "./Client";

export default class ProductAPI {
  static findAllProducts = (callback) => {
    Client.getMethod(PATHS.PRODUCTS, callback);
  };

  static getAllTypes = (callback) => {
    Client.getMethod(PATHS.CATEGORIES, callback);
  };
}
