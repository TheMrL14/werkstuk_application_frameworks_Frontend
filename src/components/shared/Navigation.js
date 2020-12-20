import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render = () => {
    return (
      <AppBar>
        <Toolbar position="static" className="navigation">
          <NavLink className={"title"} to="/">
            <Typography variant="h6">Magical Mythical Beast Bazar</Typography>
          </NavLink>
          <div className={"right"}>
            {this.props.auth.isAuthenticated ? (
              <NavLink className={"title"} to="/Profile">
                Profile
              </NavLink>
            ) : (
              <Button onClick={this.props.auth.login}>Login</Button>
            )}

            <IconButton
              edge="start"
              className={"menuButton"}
              color="inherit"
              aria-label="open drawer"
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  };
}

export default Navigation;
