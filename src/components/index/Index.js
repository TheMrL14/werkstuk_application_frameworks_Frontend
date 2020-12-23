import { Component } from "react";
import Products from "./Products";
import FilterTags from "./FilterTags";

const path = require("../../PATHS");

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
      this.setState({ viewProducts: selectedProducts });
      this.render();
      return;
    }
    this.state.types.forEach((c) => {
      if (c.isSelected) {
        selectedProducts.push(
          ...this.state.products.filter((p) => p.category === c.category)
        );
      }
    });
    this.setState({ viewProducts: selectedProducts });
    this.render();
  };

  filterClickHandler = (category) => {
    this.state.types.forEach((type) => {
      if (type.category === category) type.isSelected = !type.isSelected;
    });
    this.filterByType();
  };

  getProducts = () => {
    //fetch the courses from localhost
    fetch(path.PRODUCTS, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        console.log("Error: ", response);
      })
      .then((json) => {
        console.log("Products: ", json);
        this.setState({ products: json });
        this.filterByType();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  getTypes = () => {
    //fetch the courses from localhost
    fetch(path.CATEGORIES, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        console.log("Error: ", response);
      })
      .then((json) => {
        json.forEach((j) => {
          const type = { category: j, isSelected: false, style: j + "Btn" };
          this.state.types.push(type);
        });
        console.log("types: ", this.state.types);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
}
