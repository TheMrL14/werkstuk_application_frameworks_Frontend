import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./components/index/Index";
import Navigation from "./components/shared/Navigation";
import { Component } from "react";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback";
import Profile from "./components/user/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Navigation auth={this.auth} />
        <Switch>
          <Route
            path="/"
            render={(props) => <Index auth={this.auth} {...props}></Index>}
            exact
          />
          <Route
            path="/profile"
            render={(props) => <Profile auth={this.auth} {...props}></Profile>}
            exact
          />
          <Route
            path="/callback"
            render={(props) => (
              <Callback auth={this.auth} {...props}></Callback>
            )}
          />

          <Route component={Error} />
        </Switch>
      </>
    );
  }
}

export default App;
// <Route path="/login" component={Login} exact />
