import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import React, { Component } from "react";
import BasketContext from "../../../BasketContext";
import BasketNavItem from "./BasketNavItem";

export default class BasketNavigation extends Component {
  state = {
    anchorEl: null,
  };
  render() {
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };
    return (
      <BasketContext.Consumer>
        {(basket) => (
          <>
            <IconButton
              edge="end"
              className={"menuButton"}
              color="inherit"
              aria-label="open basket"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              //component={NavLink}
              //to="/crate"
            >
              <ShoppingBasket />
            </IconButton>

            <Menu
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={handleClose}
              keepMounted
            >
              {basket.items.map((i) => (
                <BasketNavItem
                  close={this.handleClose}
                  product={i}
                ></BasketNavItem>
              ))}
            </Menu>
          </>
        )}
      </BasketContext.Consumer>
    );
  }
}
