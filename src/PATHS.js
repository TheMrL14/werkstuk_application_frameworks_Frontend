const INDEX = "http://localhost:8080";
const API = INDEX + "/api";
const PRODUCTS = API + "/products";
const USER = API + "/user";
const PAYMENT = INDEX + "/payment";

module.exports = {
  APIINDEX: API,
  PRODUCTS: PRODUCTS,
  CATEGORIES: PRODUCTS + "/types",
  USER: USER,
  CREATE_USER: USER + "/create",
  PAYMENT: PAYMENT,
  CHARGE: PAYMENT + "/charge",
};
