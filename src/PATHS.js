const API_INDEX = "http://localhost:8080/api";
const PRODUCTS = API_INDEX + "/products";
const USER = API_INDEX + "/user";

module.exports = {
  APIINDEX: API_INDEX,
  PRODUCTS: PRODUCTS,
  CATEGORIES: PRODUCTS + "/types",
  USER: USER,
  CREATE_USER: USER + "/create",
};
