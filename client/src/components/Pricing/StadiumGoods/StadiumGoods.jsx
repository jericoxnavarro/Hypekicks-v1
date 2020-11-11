import React, { useEffect, useState } from "react";
import "../../../sass/Searchhero.scss";
import Pricingbox from "./Pricingbox";

const StadiumGoods = () => {
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
            className="logo-title stadiumgoods"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            space="preserve"
            viewBox="0 0 216 104.2"
            version="1.1"
            y="0px"
            x="0px"
            xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path d="m193.8 20l-12 24.8h-0.1l-2.8-24.8h-12.3l-7 37.6h0.4c-2.4 1.6-4.3 3.8-5.4 6.6-0.2-0.5-0.4-0.9-0.7-1.4-1.3-2.6-3.3-4.3-5.3-5.3 2.3-0.7 4.4-1.8 6.1-3.3 2.8-2.4 4.7-5.2 5.9-11.5l4.2-22.7h-9.6l-4.2 22.7c-0.6 3-1.3 7.2-6.1 7.2-4.7 0-4-4.6-3.5-7.2l4.2-22.7h-9.6l-4.2 22.7c-1 5.5-0.9 8.2 1.6 11.6 0.4 0.6 1 1.1 1.5 1.5h-7.5l6.6-35.8h-9.6l-6.9 37.3c-2.5-1.4-5.4-2.2-8.8-2.2h-0.1c6.5-3.3 10-9.5 11.3-16.4 0.8-4.1 0.6-8.1-1.3-11.7-3.6-7-11.1-7-15.3-7h-12.5l-5.5 29.6-6.3-29.6h-7.6l-19.7 33.5 4.7-25.1h7.5l4.8-8.4h-28l-1.6 8.4h7.7l-5 27.2c-2.2-0.9-4.6-1.5-7.2-1.5-0.5 0-1 0-1.5 0.1 0.2-0.1 0.3-0.2 0.5-0.3 3.3-2.5 4.8-6.3 5.4-9.9 1-6-2.6-8.6-7.5-10.1l-2.4-0.9c-1.6-0.5-4-1.4-3.7-3.5s2.8-3.1 4.6-3.1c2.9-0.1 5.2 0.4 6.7 1.8l1.6-7.6c-2.7-1.6-5.6-2.3-8.4-2.3-7.4 0-13.5 4.9-14.7 12.4-1.1 7.2 2.6 8.7 8.3 10.4 2 0.6 5.6 1.5 5.2 4.2-0.4 2.6-3 3.7-5.3 3.7-3.3 0-5.8-1.7-7.9-3.8l-5.3 7.7c3.3 2.6 7.7 4.2 12.3 4.2h0.1c-5.9 3.4-10.5 9.2-11.8 16.1-2 10.8 4.9 19.7 16.3 19.7 8.4 0 17.2-4.9 21.6-13.5 0.7 7.7 6.6 14.2 16.4 14.2 8.5 0 16-4.8 20.2-11.4 1.7 6.5 7.3 11.6 16 11.6 8 0 15.2-4.3 19.6-10.3l-1.8 9.6h13.2c14.2 0 20.9-8.6 22.8-18.8 1.5 1.6 3.9 2.4 6.8 3.3 2 0.6 5.6 1.5 5.2 4.2-0.4 2.6-3 3.7-5.2 3.7-3 0-5.5-1.6-7.5-3.5-1.5 3.2-2.7 4.5-5 6.7 3.3 2.4 7 4.9 11.5 4.9 3.7 0 7.8-1 11-3.5 3.3-2.5 4.8-6.3 5.4-9.9 0.9-6-2.6-8.6-7.5-10.1l-2.3-0.7c-1.6-0.5-4-1.4-3.7-3.5s2.8-3.1 4.6-3.1c2.3 0 4.4 1 6 2.4l5-7.4c-0.3-0.2-0.7-0.4-1.1-0.5h4.2l13.3-28.3 0.1 0.1-5.5 28.2h8.8l7-37.6h-12.4zm-95 8.4h4.2c4.3 0 5.9 1.8 6.7 3.5 1 2.1 0.9 4.8 0.5 7-1 5.3-4 10.3-11.1 10.3h-4.1l3.8-20.8zm-25.8 3.3h0.1l1.5 12.9h-7.9l6.3-12.9zm-21.1 35.1c-0.8 1.4-1.5 2.8-2 4.2h-21l-1.4 7.7h11.2c-1.7 3.7-5.3 6.1-10.1 6.1-4.7 0-9.7-3.4-8.2-11.3 1.4-7.5 7.6-11 12.3-11 4.1 0 6.4 2.2 7.4 4.9h10.8c-0.4-3.9-2.5-7.3-5.6-9.8h14.4l3-5.4h13.1l0.5 3c-1.2-0.2-2.4-0.4-3.8-0.4-10.6 0-17.8 7.1-20.6 12zm27.2 7.6c-0.9 4.8-5.4 11-12.2 11-6.5 0-9.4-5.4-8.3-11.2 1-5.3 5.6-11 12.3-11 6.9 0.1 9.1 6.3 8.2 11.2zm9.4-7.9c-0.9-3.7-3.1-6.8-6.3-8.9h14.8c0.5 0 1 0 1.5-0.1-4.8 2.4-8.1 6-10 9zm26.8 8.2c-0.9 4.8-5.4 11-12.2 11-6.5 0-9.4-5.4-8.3-11.2 1-5.3 5.6-11 12.3-11 7 0 9.1 6.3 8.2 11.2zm2.8-17.1h7.7l-1.5 7.9c-1.1-3.3-3.2-6.1-6.2-7.9zm27.5 17.1c-1 5.3-4 10.3-11.1 10.3h-4.1l3.8-20.7h4.2c4.3 0 5.9 1.8 6.7 3.5 0.9 2 0.9 4.7 0.5 6.9zm23.2-19.6l4.5-25.7 0.1-0.1 2.7 27.2c-2.3-0.8-4.9-1.3-7.3-1.4z" />
              <path
                className="st0"
                d="m180 66.3c0-5.1 4.1-9.1 9.1-9.1 5.1 0 9.1 4 9.1 9.1 0 5-4 9.1-9.1 9.1-5 0-9.1-4.1-9.1-9.1zm1.5 0c0 4.2 3.4 7.6 7.6 7.6s7.6-3.4 7.6-7.6c0-4.3-3.4-7.6-7.6-7.6s-7.6 3.3-7.6 7.6zm7.4 1.1h-1.7v4.1h-1.6v-10.4h4.3c2 0 3.5 1.2 3.5 3.2 0 2.3-2.1 3.1-2.7 3.1l2.8 4.2h-1.9l-2.7-4.2zm-1.7-5v3.6h2.7c1.2 0 1.9-0.7 1.9-1.8 0-1.2-0.7-1.9-1.9-1.9h-2.7z"
              />
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
                  price={product.lowestResellPrice.stadiumGoods}
                  brand={product.brand}
                  _id={product._id}
                  styleID={product.styleID}
                  resellLinks={product.resellLinks.stadiumGoods}
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

export default StadiumGoods;
