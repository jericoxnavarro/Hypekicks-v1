import React, { useEffect, useState } from "react";
import "../../../sass/Searchhero.scss";
import Pricingbox from "./Pricingbox";

const StockX = () => {
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
            className="logo-title"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 235.82 106.49"
          >
            <defs>
              <style></style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Crop_Marks" data-name="Crop Marks">
                <polygon
                  className="cls-1 green"
                  points="176.75 60.62 144.57 106.49 178.92 93.55 188.55 78.5 176.75 60.62"
                />
                <polygon
                  className="cls-1 green"
                  points="201.92 58.47 201.95 58.43 195.77 49.73 203.43 56.2 223.33 25.81 230.73 26.76 231.17 0 194.19 22.08 203.33 23.25 190.19 41.86 175.2 20.63 144.57 6.8 178.46 58.48 178.45 58.49 190.19 76.37 190.19 76.37 201.46 93.55 235.82 106.49 201.92 58.47"
                />
                <path
                  className="cls-1"
                  d="M15.27,54.71c-3-1.18-5.56-2.21-5.56-3.84,0-2.52,3.08-2.72,4-2.72a10.36,10.36,0,0,1,7,2.46l1.08,1.08,3.52-6.59-.55-.59c-.15-.15-3.65-3.83-10.95-3.83S1.3,44.82,1.3,50.75c0,6.61,5.82,9,10.49,10.84,3,1.22,5.65,2.28,5.65,4s-2.05,2.78-4.08,2.78A12.42,12.42,0,0,1,5.17,65l-1-1L0,70.22l.61.66a17.91,17.91,0,0,0,12.75,5c7.35,0,12.49-4.22,12.49-10.26,0-6.69-5.87-9-10.58-10.87"
                />
                <path
                  className="cls-1"
                  d="M47.69,49.05V41.18H38.5V31.51l-9.12,1.55V64a26.11,26.11,0,0,0,.46,5.22,8.85,8.85,0,0,0,1.75,3.9,7.64,7.64,0,0,0,3.51,2.34,17.5,17.5,0,0,0,5.59.76A28.8,28.8,0,0,0,44.12,76,11,11,0,0,0,47.47,75l.22-.1v-8l-.62.45a4.67,4.67,0,0,1-1.92.73,13.12,13.12,0,0,1-2.37.24c-1.71,0-2.85-.43-3.4-1.28a7,7,0,0,1-.88-3.76V49.05Z"
                />
                <path
                  className="cls-1"
                  d="M85.18,50.91a17,17,0,0,0-9.86-9.29,21.09,21.09,0,0,0-14.47,0A17,17,0,0,0,51,50.91a19.4,19.4,0,0,0,0,14.72,17,17,0,0,0,9.86,9.29,21.09,21.09,0,0,0,14.47,0,17,17,0,0,0,9.86-9.29,19.28,19.28,0,0,0,0-14.72m-7.67,7.36a10.57,10.57,0,0,1-.63,3.62A9.45,9.45,0,0,1,61.17,65a9.07,9.07,0,0,1-1.87-3.08,10.56,10.56,0,0,1,0-7.24,9.07,9.07,0,0,1,1.87-3.08A9.79,9.79,0,0,1,72,49.44a9.59,9.59,0,0,1,3,2.13,9.26,9.26,0,0,1,1.86,3.07,10.48,10.48,0,0,1,.64,3.63"
                />
                <path
                  className="cls-1"
                  d="M112.9,64.92a7.49,7.49,0,0,1-2.71,2.22,7.88,7.88,0,0,1-3.45.76A9.17,9.17,0,0,1,99.82,65,9.07,9.07,0,0,1,98,61.89a10.59,10.59,0,0,1,0-7.25,9.12,9.12,0,0,1,1.87-3.07,9.17,9.17,0,0,1,6.92-2.93,6.2,6.2,0,0,1,3.08.85,12.83,12.83,0,0,1,3,2.37l.27.28,6.32-6.32-.25-.27a15.14,15.14,0,0,0-5.82-4,19.53,19.53,0,0,0-13.81,0,17,17,0,0,0-9.86,9.29,19.28,19.28,0,0,0,0,14.72,17,17,0,0,0,9.86,9.29,20.51,20.51,0,0,0,7.24,1.28,18.38,18.38,0,0,0,2.7-.25,20.47,20.47,0,0,0,3.26-.82,20,20,0,0,0,3.38-1.49,13.47,13.47,0,0,0,3-2.22l.26-.26-6.13-6.6Z"
                />
                <polygon
                  className="cls-1"
                  points="140.42 56.76 155.14 41.18 143.35 41.18 131.03 54.43 131.03 23.52 121.91 25.08 121.91 75.36 131.03 75.36 131.03 58.87 143.89 75.36 155.97 75.36 140.42 56.76"
                />
              </g>
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
                  price={product.lowestResellPrice.stockX}
                  brand={product.brand}
                  _id={product._id}
                  styleID={product.styleID}
                  resellLinks={product.resellLinks.stockX}
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

export default StockX;