import { MenuItem } from "@material-ui/core";
import React, { Component } from "react";

export default class BasketNavItem extends Component {
  handleClick = () => {
    this.props.close();
  };

  render() {
    const item = this.props.product.product;
    const count = this.props.product.count;

    return (
      <MenuItem onClick={this.handleClick}>
        <p>
          {count}x {item.productName}
        </p>
      </MenuItem>
    );
  }
}
