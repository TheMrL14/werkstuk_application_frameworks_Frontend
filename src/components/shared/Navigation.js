import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { NavLink } from "react-router-dom";
import UserNavigation from "./UserNavigation";

class Navigation extends Component {
  render = () => {
    return (
      <AppBar>
        <Toolbar position="static" className="navigation">
          <NavLink className={"title"} to="/">
            <Typography variant="h6">Magical Mythical Beast Bazar</Typography>
          </NavLink>
          <UserNavigation auth={this.props.auth}></UserNavigation>
        </Toolbar>
      </AppBar>
    );
  };
}

export default Navigation;
