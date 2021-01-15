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
import Aboutus from "./components/About Us/Aboutus";
import Page404 from "./components/404";
import { UserProvider } from "./components/User.context";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Home brand="home" />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/brands/:brandName"
              component={({ match }) => {
                return (
                  <>
                    <Navbar />
                    <Brands
                      brand={match.params.brandName.toLowerCase()}
                      id={match.params.brandName}
                    />
                    ;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/search"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Searchcontent />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/stockX"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Pricing pricing="stockX" />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/goat"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Pricing pricing="goat" />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/flightclub"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Pricing pricing="flightClub" />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/stadiumgoods"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Pricing pricing="stadiumGoods" />;
                  </>
                );
              }}
            />
            <Route exact path="/sign-in" component={Signin} />
            <Route exact path="/sign-up" component={Signup} />
            <Route
              exact
              path="/profile/:username"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Profile />;
                  </>
                );
              }}
            />
            <Route
              exact
              path="/aboutus"
              component={() => {
                return (
                  <>
                    <Navbar />
                    <Aboutus />;
                  </>
                );
              }}
            />
            <Route component={Page404} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
