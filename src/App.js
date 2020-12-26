import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./components/index/Index";

import { Component } from "react";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback";
import Profile from "./components/profile/Profile";
import ShoppingBasket from "./components/profile/ShoppingBasket";
import AuthContext from "./AuthContext";
import BasketContext from "./BasketContext";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./components/shared/Navigation/Navigation";
import Basket from "./model/Basket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      basket: new Basket(),
    };
  }

  render() {
    const { auth, basket } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <BasketContext.Provider value={basket}>
          <Navigation auth={auth} />
          <Switch>
            <Route path="/" render={(props) => <Index {...props} />} exact />
            <Route
              path="/callback"
              render={(props) => <Callback auth={auth} {...props}></Callback>}
            />
            <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
            <PrivateRoute
              path="/basket"
              component={ShoppingBasket}
            ></PrivateRoute>
            <Route component={Error} />
          </Switch>
        </BasketContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default App;
// <Route path="/login" component={Login} exact />
