import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Searchcontent from "./components/Search/Search";
import Pricing from "./components/Pricing/Pricing";
import Signin from "./components/User/Signin";
import Signup from "./components/User/Signup";
import Profile from "./components/Profile/Profile.user";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home brand="home" />} />
          <Route
            exact
            path="/nike"
            component={() => (
              <Brands brand="nike" id="5fb25d4f1baee003e49264a8" />
            )}
          />
          <Route
            exact
            path="/adidas"
            component={() => (
              <Brands brand="adidas" id="5fb267415dc23804286cf5f4" />
            )}
          />
          <Route
            exact
            path="/vans"
            component={() => (
              <Brands brand="vans" id="5fb26b252a3c4704434e0e33" />
            )}
          />
          <Route
            exact
            path="/converse"
            component={() => (
              <Brands brand="converse" id="5fb26b8c2a3c4704434e10c6" />
            )}
          />
          <Route
            exact
            path="/newbalance"
            component={() => (
              <Brands brand="newbalance" id="5fb26bff2a3c4704434e142f" />
            )}
          />
          <Route
            exact
            path="/reebok"
            component={() => (
              <Brands brand="reebok" id="5fb26c5a2a3c4704434e177e" />
            )}
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
          <Route exact path="/sign-in" component={Signin} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
