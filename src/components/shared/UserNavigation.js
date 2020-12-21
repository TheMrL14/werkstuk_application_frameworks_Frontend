import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";

export default class UserNavigation extends Component {
  state = {
    anchorEl: null,
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const handleLogOut = () => {
      logout();

      handleClose();
    };
    return (
      <div className={"right"}>
        <IconButton
          edge="end"
          className={"menuButton"}
          color="inherit"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
        >
          {isAuthenticated() ? (
            <div>
              <MenuItem onClick={handleClose}>
                <NavLink className={"title"} to="/profile">
                  Profile
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </div>
          ) : (
            <Button onClick={login}>Login</Button>
          )}
        </Menu>
        <IconButton
          edge="end"
          className={"menuButton"}
          color="inherit"
          aria-label="open drawer"
        >
          <ShoppingCartIcon />
        </IconButton>
      </div>
    );
  }
}
