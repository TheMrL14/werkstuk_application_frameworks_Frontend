import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./components/index/Index";
import Navigation from "./components/shared/Navigation";
import { Component } from "react";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback";
import Profile from "./components/user/Profile";
import ShoppingCrate from "./components/user/ShoppingCrate";
import AuthContext from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
    };
  }

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Navigation auth={auth} />
        <Switch>
          <Route path="/" render={(props) => <Index {...props} />} exact />

          <Route
            path="/callback"
            render={(props) => <Callback auth={auth} {...props}></Callback>}
          />
          <PrivateRoute component={Profile}></PrivateRoute>
          <PrivateRoute component={ShoppingCrate}></PrivateRoute>
          <Route component={Error} />
        </Switch>
      </AuthContext.Provider>
    );
  }
}

export default App;
// <Route path="/login" component={Login} exact />
