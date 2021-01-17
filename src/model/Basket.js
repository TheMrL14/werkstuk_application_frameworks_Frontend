const BASKET = "SHOPPING_BASKET_ITEMS";
export default class Basket {
  constructor() {
    this.init();
  }

  // INIT BASKET
  //get items from localstorage and fill when no localstorage items found
  init = () => {
    const localStorageItems = this.getItems();
    this.items = localStorageItems != null ? localStorageItems.items : [];
    console.log(this.items);

    this.totalPrice =
      localStorageItems != null ? localStorageItems.totalPrice : 0;
  };
  //ADD item to localstorage
  //check if item exist if yes => add count else create and add new item
  addItem = (product) => {
    let foundIndex = this.items.findIndex((i) => i.id === product.id);
    console.log(foundIndex);
    if (foundIndex >= 0) {
      console.log("komt er in ofwa");
      this.items[foundIndex].count++;
    } else {
      console.log("nieuw item");
      this.items.push(new BasketItem(1, product));
    }

    this.totalPrice = this.calculateTotalPrice();
    this.updateStorage();
  };

  //Clear localstorage and add new items
  updateStorage = () => {
    this.emptyStorage();

    localStorage.setItem(BASKET, JSON.stringify(this));
  };

  getItems = () => {
    return localStorage.getItem(BASKET) === null
      ? null
      : JSON.parse(localStorage.getItem(BASKET));
  };

  emptyStorage = () => {
    localStorage.removeItem(BASKET);
  };

  // calculate the price of all items in basket
  calculateTotalPrice = () => {
    let totalPrice = 0;
    console.log(this.items);
    if (this.items.count <= 0) return 0;
    this.items.forEach((i) => {
      totalPrice = (totalPrice + i.product.price) * i.count;
    });
    console.log("total price:" + totalPrice);
    return totalPrice;
  };
}

class BasketItem {
  constructor(count, product) {
    this.count = count;
    this.product = product;
    this.id = product.id;
  }
}
