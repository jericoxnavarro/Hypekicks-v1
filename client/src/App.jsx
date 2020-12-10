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
import Page404 from "./components/404";
import { UserProvider } from "./components/User.context";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={() => <Home brand="home" />} />
            <Route
              exact
              path="/nike"
              component={() => <Brands brand="nike" id="Nike" />}
            />
            <Route
              exact
              path="/adidas"
              component={() => <Brands brand="adidas" id="Adidas" />}
            />
            <Route
              exact
              path="/vans"
              component={() => <Brands brand="vans" id="Vans" />}
            />
            <Route
              exact
              path="/converse"
              component={() => <Brands brand="converse" id="Converse" />}
            />
            <Route
              exact
              path="/newbalance"
              component={() => <Brands brand="newbalance" id="NewBalance" />}
            />
            <Route
              exact
              path="/reebok"
              component={() => <Brands brand="reebok" id="Reebok" />}
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
            <Route component={Page404} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
