import { Component } from "react";
import Products from "./Products";

let INDEX = "http://localhost:8080/api/";
let ANIMAL = INDEX + "animals";

class Index extends Component {
  state = {
    products: [],
  };

  render = () => {
    return (
      <div className="index">
        <Products products={this.state.products}></Products>
      </div>
    );
  };

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    //fetch the courses from localhost
    fetch(ANIMAL, {
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
        console.log("courses: ", json);
        this.setState({ products: json });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
}

export default Index;
