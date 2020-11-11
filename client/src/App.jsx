import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Searchcontent from "./components/Search/Search";
import Pricing from "./components/Pricing/Pricing";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home brand="home" />} />
          <Route exact path="/nike" component={() => <Brands brand="nike" />} />
          <Route
            exact
            path="/adidas"
            component={() => <Brands brand="adidas" />}
          />
          <Route exact path="/vans" component={() => <Brands brand="vans" />} />
          <Route
            exact
            path="/converse"
            component={() => <Brands brand="converse" />}
          />
          <Route
            exact
            path="/newbalance"
            component={() => <Brands brand="newbalance" />}
          />
          <Route
            exact
            path="/reebok"
            component={() => <Brands brand="reebok" />}
          />
          <Route exact path="/search" component={Searchcontent} />
          <Route
            exact
            path="/stockX"
            component={() => <Pricing pricing="stockX" />}
          />
          <Route
            exact
            path="/goat"
            component={() => <Pricing pricing="goat" />}
          />
          <Route
            exact
            path="/flightclub"
            component={() => <Pricing pricing="flightClub" />}
          />
          <Route
            exact
            path="/stadiumgoods"
            component={() => <Pricing pricing="stadiumGoods" />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
