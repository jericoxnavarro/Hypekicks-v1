import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar.jsx";
import Homehero from "./components/Home/heroHome";
import Contenthero from "./components/Home/heroContent";
import Nikehero from "./components/Brands/Nike/nikeHero";
import Adidashero from "./components/Brands/Adidas/adidasHero";
import Vanshero from "./components/Brands/Vans/vansHero";
import Conversehero from "./components/Brands/Converse/converseHero";
import Brandshero from "./components/Brands/Brandshero";
import Brandscontent from "./components/Brands/Brandscontent";
import Searchcontent from "./components/Search/Searchcontent";
import StockX from "./components/Pricing/StockX/StockX";
import Goat from "./components/Pricing/Goat/Goat";
import FlightClub from "./components/Pricing/FlightClub/FlightClub";
import StadiumGoods from "./components/Pricing/StadiumGoods/StadiumGoods";

const Home = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const getPopular = async () => {
      const response = await fetch(`http://localhost:8080/home`);
      const data = await response.json();
      setPopular(data);
    };
    getPopular();
  }, []);

  return (
    <>
      <Homehero />
      <Contenthero products={popular} />
    </>
  );
};

const Nike = () => {
  const [nike, setNike] = useState([]);

  useEffect(() => {
    const getNike = async () => {
      const response = await fetch(`http://localhost:8080/search/nike `);
      const data = await response.json();
      setNike(data);
      console.log(data);
    };
    getNike();
  }, []);

  return (
    <>
      <Nikehero />
      <Brandscontent products={nike} />
    </>
  );
};

const Adidas = () => {
  const [adidas, setAdidas] = useState([]);

  useEffect(() => {
    const getAdidas = async () => {
      const response = await fetch(`http://localhost:8080/search/adidas`);
      const data = await response.json();
      setAdidas(data);
    };
    getAdidas();
  }, []);

  return (
    <>
      <Adidashero />
      <Brandscontent products={adidas} />
    </>
  );
};

const Vans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    getVans();
  }, []);

  const getVans = async () => {
    const response = await fetch(`http://localhost:8080/search/vans`);
    const data = await response.json();
    setVans(data);
  };

  return (
    <>
      <Vanshero />
      <Brandscontent products={vans} />
    </>
  );
};

const Converse = () => {
  const [converse, setConverse] = useState([]);

  useEffect(() => {
    getConverse();
  }, []);

  const getConverse = async () => {
    const response = await fetch(`http://localhost:8080/search/converse`);
    const data = await response.json();
    setConverse(data);
  };

  return (
    <>
      <Conversehero />
      <Brandscontent products={converse} />
    </>
  );
};

const Newbalance = () => {
  const [newbalance, setNewbalance] = useState([]);

  useEffect(() => {
    getNewbalance();
  }, []);

  const getNewbalance = async () => {
    const response = await fetch(`http://localhost:8080/search/newbalance`);
    const data = await response.json();
    setNewbalance(data);
  };

  return (
    <>
      <Brandshero />
      <Brandscontent products={newbalance} />
    </>
  );
};

const Reebok = () => {
  const [reebok, setReebok] = useState([]);

  useEffect(() => {
    getReebok();
  }, []);

  const getReebok = async () => {
    const response = await fetch(`http://localhost:8080/search/reebok`);
    const data = await response.json();
    setReebok(data);
  };

  return (
    <>
      <Brandshero />
      <Brandscontent products={reebok} />
    </>
  );
};

const Search = () => (
  <>
    <Searchcontent />
  </>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/nike" component={Nike} />
          <Route exact path="/adidas" component={Adidas} />
          <Route exact path="/vans" component={Vans} />
          <Route exact path="/converse" component={Converse} />
          <Route exact path="/newbalance" component={Newbalance} />
          <Route exact path="/reebok" component={Reebok} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/stockX" component={StockX} />
          <Route exact path="/goat" component={Goat} />
          <Route exact path="/flightclub" component={FlightClub} />
          <Route exact path="/stadiumgoods" component={StadiumGoods} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
