import React, { useEffect, useState } from "react";
import "../../../sass/Searchhero.scss";
import Pricingbox from "./Pricingbox";

const Goat = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Nike");

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`http://localhost:8080/search/${query}`);
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <>
      <main className="main-searchhero">
        <div className="container">
          <svg
            className="Logo__SvgLogo-sc-16hbji1-0 fcjFOZ logo-title goat"
            width="368px"
            height="84px"
            version="1.1"
            id="GOAT_logo"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 368 84"
          >
            <g>
              <path d="M42.2,50.7h23.4v12.2c-5.4,6.2-13,10.5-23.3,10.5c-17.7,0-30.4-13.2-30.4-31.4c0-18.4,12.8-31.4,30.4-31.4 c10.8,0,19.9,5.4,24.5,12.2l8.5-7.6C67.7,5.8,56.7,0,42.3,0C18.6,0,0,17.8,0,42s18.6,42,42.2,42c15.5,0,27.9-7.7,35.1-18.2V40.2 H42.2V50.7z"></path>
              <path d="M148.2,0C124.6,0,106,17.8,106,42s18.6,42,42.2,42c23.7,0,42.2-17.8,42.2-42S171.9,0,148.2,0z M148.2,73.4 c-17.5,0-30.4-13.2-30.4-31.4c0-18.4,12.8-31.4,30.4-31.4c17.5,0,30.5,13,30.5,31.4C178.7,60.2,165.8,73.4,148.2,73.4z"></path>
              <path d="M243.2,1.7l-34.9,80.5h11.8l9.8-22.3h38.2l9.8,22.3h11.8L254.9,1.7H243.2z M234.5,49.4L249,16.1h0.1l14.4,33.3H234.5z"></path>
              <polygon points="300.1,1.7 300.1,12.3 327.7,12.3 327.7,82.3 339.5,82.3 339.5,12.3 367,12.3 367,1.7 	"></polygon>
            </g>
          </svg>
          <form className="search">
            <input
              className="search-input"
              placeholder="Search"
              type="text"
              name="search"
              onChange={updateSearch}
            />
            <button
              className="search-submit"
              type="submit"
              name="submit"
              onClick={updateQuery}
            >
              <i class="fad fa-search"></i>
            </button>
          </form>
        </div>
      </main>

      <main className="main-content">
        <div className="container">
          <h1 className="search-heading">{query}</h1>
          <p className="search-text">Top Result of {query}</p>
          <div className="grid-main-pricing">
            {products.map((product, index) => (
              <div key={index} className="box">
                <Pricingbox
                  shoeName={product.shoeName}
                  image={product.thumbnail}
                  price={product.lowestResellPrice.goat}
                  brand={product.brand}
                  _id={product._id}
                  styleID={product.styleID}
                  resellLinks={product.resellLinks.goat}
                  description={product.description}
                  lowestResellPrice={product.lowestResellPrice}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Goat;
