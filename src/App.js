import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./components/index/Index";
import Navigation from "./components/shared/Navigation";
import Login from "./components/login/login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/login" component={Login} exact />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
