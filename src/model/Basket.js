const BASKET = "SHOPPING_BASKET_ITEMS";
export default class Basket {
  constructor() {
    this.items = this.getItems();
    this.totalPrice = 0;
  }

  addItem = (product) => {
    var foundIndex = this.items.findIndex((i) => i.id === product.id);
    console.log(foundIndex <= 0);
    if (foundIndex >= 0) {
      console.log("komt er in ofwa");
      this.items[foundIndex].count++;
    } else {
      this.items.push(new BasketItem(1, product));
    }
    console.log(this.items);
    this.totalPrice = this.calculateTotalPrice();
    this.updateStorage();
  };

  updateStorage = () => {
    this.emptyStorage();

    localStorage.setItem(BASKET, JSON.stringify(this));
  };

  getItems = () => {
    return localStorage.getItem(BASKET) === null
      ? []
      : JSON.parse(localStorage.getItem(BASKET));
  };

  emptyStorage = () => {
    localStorage.removeItem(BASKET);
  };

  calculateTotalPrice = () => {
    let totalPrice = 0;
    console.log(this.items);
    if (this.items.count <= 0) return 0;
    this.items.array.forEach((i) => {
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
