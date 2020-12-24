import { Component } from "react";
import Products from "./Products";
import FilterTags from "./FilterTags";
import ProductAPI from "../../API/ProductAPI";

export default class Index extends Component {
  state = {
    products: [],
    viewProducts: [],
    types: [],
  };

  render = () => {
    return (
      <div className="content">
        <FilterTags
          types={this.state.types}
          onClick={this.filterClickHandler}
        ></FilterTags>
        <Products products={this.state.viewProducts}></Products>
      </div>
    );
  };

  componentDidMount = () => {
    this.getProducts();
    this.getTypes();
  };

  filterByType = () => {
    let selectedProducts = [];
    //check if 0 btns are on => display all products
    if (!this.state.types.some((t) => t.isSelected)) {
      selectedProducts.push(...this.state.products);
      this.reloadItems(selectedProducts);
      return;
    }
    this.state.types.forEach((c) => {
      if (!c.isSelected) return;
      selectedProducts.push(
        ...this.state.products.filter((p) => p.category === c.category)
      );
    });
    this.reloadItems(selectedProducts);
  };

  filterClickHandler = (category) => {
    this.state.types.forEach((type) => {
      if (type.category === category) type.isSelected = !type.isSelected;
    });
    this.filterByType();
  };

  getProducts = () => {
    ProductAPI.findAllProducts((json) => {
      this.setState({ products: json });
      this.filterByType();
    });
  };

  getTypes = () => {
    ProductAPI.getAllTypes((json) => {
      json.forEach((j) => {
        const type = { category: j, isSelected: false, style: j + "Btn" };
        this.state.types.push(type);
      });
    });
  };

  reloadItems = (products) => {
    this.setState({ viewProducts: products });
    this.render();
  };
}
