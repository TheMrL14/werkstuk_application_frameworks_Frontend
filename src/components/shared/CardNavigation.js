import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import React, { Component } from "react";

export default class CardNavigation extends Component {
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
          <MenuItem onClick={handleClose}>Test</MenuItem>
        </Menu>
      </>
    );
  }
}
