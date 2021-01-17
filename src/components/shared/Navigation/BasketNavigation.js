import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import BasketContext from "../../../BasketContext";
import BasketNavItem from "./BasketNavItem";

export default class BasketNavigation extends Component {
  state = {
    anchorEl: null,
  };
  render() {
    const handleClick = (event) => {
      this.render();
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
              style={{ paddingBottom: 0 }}
            >
              {basket.itemsLength !== 0
                ? basket.items.map((i) => (
                    <BasketNavItem
                      close={this.handleClose}
                      product={i}
                    ></BasketNavItem>
                  ))
                : null}
              {basket.itemsLength !== 0 ? (
                <NavLink className={"title navItemBtn"} to="/basket">
                  <MenuItem
                    style={{ backgroundColor: "#51538F" }}
                    onClick={handleClose}
                  >
                    basket
                  </MenuItem>
                </NavLink>
              ) : null}
            </Menu>
          </>
        )}
      </BasketContext.Consumer>
    );
  }
}
