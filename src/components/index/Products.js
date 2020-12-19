import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ProductTile from "./ProductTile";

class Products extends Component {
  deleteHandler = (id) => {
    this.props.onDelete(id);
  };

  clickHandler = (id) => {
    this.props.onClick(id);
  };

  render() {
    return (
      <Grid container spacing={3}>
        {this.props.products.map((i) => (
          <Grid item xs={1} sm={12}>
            <ProductTile product={i}></ProductTile>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Products;
