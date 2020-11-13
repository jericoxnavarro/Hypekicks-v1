import React, { useEffect, useState } from "react";
import "../../sass/Search.scss";
import Pricingbox from "./Pricingbox";
import Mainlogo from "./Mainlogo";

const FlightClub = ({ pricing }) => {
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
          <Mainlogo pricing={pricing} />
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
              <i className="fad fa-search"></i>
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
                  price={product.lowestResellPrice[pricing]}
                  brand={product.brand}
                  _id={product._id}
                  styleID={product.styleID}
                  resellLinks={product.resellLinks[pricing]}
                  description={product.description}
                  lowestResellPrice={product.lowestResellPrice}
                  pricing={pricing}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default FlightClub;
