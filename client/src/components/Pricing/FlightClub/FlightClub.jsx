import React, { useEffect, useState } from "react";
import "../../../sass/Searchhero.scss";
import Pricingbox from "./Pricingbox";

const FlightClub = () => {
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
            className="logo-title flightclub"
            width="126"
            height="24"
            viewBox="0 0 126 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M26.9111 0.196289L21.875 23.3701H27.0667L32.0833 0.196289H26.9111Z" />
            <path d="M13.7861 5.19301L14.8556 0.196289H5.03611L0 23.3701H5.19167L7.25278 13.8291H11.9L13.0083 8.71432H8.36111L9.11944 5.19301H13.7861Z" />
            <path d="M17.5385 18.4914L21.5052 0.196289H16.333L11.2969 23.3701H20.6108L21.6802 18.4914H17.5385Z" />
            <path d="M55.2226 0.196289L53.4142 8.5176H51.3531L53.142 0.196289H47.9698L42.9531 23.3701H48.1253L50.2253 13.6717H52.3059L50.2059 23.3701H55.3781L60.3948 0.196289H55.2226Z" />
            <path d="M61.6774 0.196289L60.5108 5.52744H63.2719L59.4219 23.3701H64.5941L68.4635 5.52744H71.0497L72.1969 0.196289H61.6774Z" />
            <path d="M37.2752 13.6525H38.753L37.9169 17.5082C37.8002 18.059 37.4308 18.2754 37.0224 18.2754C34.8058 18.2754 35.4474 12.4525 37.3724 8.16393C38.5197 5.60656 40.5808 5.19344 41.7669 5.2918C42.778 5.39016 43.828 5.58688 44.7224 5.84262C45.053 4.34754 45.5197 2.18361 45.8891 0.491803C44.9363 0.255738 43.3419 0 42.4086 0C38.5391 0 35.7586 1.53443 33.6197 4.64262C31.6169 7.5541 30.2363 12.9639 30.2363 16.4852C30.2363 21.0492 31.9474 23.5475 37.003 23.5475C38.5002 23.5475 40.0947 23.4689 41.7086 22.8984L44.8391 8.49836H38.403L37.2752 13.6525Z" />
            <path d="M91.4467 18.4914L95.4134 0.196289H90.2412L85.2051 23.3701H94.519L95.569 18.4914H91.4467Z" />
            <path d="M108.189 0.196289C106.828 6.4717 104.709 16.2487 104.534 17.0356C104.281 18.216 103.698 18.4127 102.92 18.4127C102.025 18.4127 101.85 17.9012 102.025 17.0356C102.103 16.7012 104.378 6.19629 105.681 0.196289H100.567C99.5365 4.99629 97.4365 14.6356 96.8726 17.2324C96.1143 20.734 97.0281 21.9143 97.942 22.6815C99.0698 23.6258 100.625 23.7045 101.695 23.7045C104.184 23.7045 105.467 23.2717 106.575 22.4258C107.684 21.5996 108.928 20.4586 109.531 17.6455C109.959 15.6586 112.098 5.74383 113.303 0.196289H108.189V0.196289Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.47 0.196289C124.581 0.196289 125.845 1.57334 125.845 3.85531C125.845 6.64875 124.62 9.44219 122.792 10.5832C123.122 10.9373 124.017 11.9012 124.017 13.7307C124.017 16.1897 122.928 20.675 120.147 22.3865C118.67 23.2914 117.367 23.3701 114.139 23.3701H109.647L114.684 0.196289H119.7H121.47ZM118.553 8.61596H117.872L118.709 4.7799H119.35C120.206 4.7799 120.4 5.6258 120.4 6.05858C120.42 7.21924 119.7 8.61596 118.553 8.61596ZM118.164 17.0947C117.95 17.8619 117.367 18.452 116.57 18.452H115.734L116.803 13.4946H117.639C118.339 13.4946 118.67 14.0848 118.67 14.616C118.67 15.1274 118.378 16.3865 118.164 17.0947Z"
            />
            <path d="M85.5749 0.0195312C83.6888 0.0195312 80.9471 0.353957 78.7888 3.79658C77.1166 6.47199 75.4443 15.3638 75.4443 17.8425C75.4443 23.0949 79.2749 23.4884 82.0166 23.4884C82.9693 23.4884 83.6499 23.39 83.8443 23.3507L85.0499 17.8425C84.5249 17.8818 83.3777 17.9212 82.5027 17.8622C80.4804 17.6851 80.6749 15.9343 80.9277 14.3999C81.1804 12.8851 81.686 10.5638 82.0943 9.08838C82.4249 7.90806 82.6971 6.76707 83.6888 5.96052C84.7388 5.11461 86.236 5.44904 87.4416 5.6851L88.6277 0.235925C87.9666 0.157236 86.761 0.0195312 85.5749 0.0195312Z" />
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
                  price={product.lowestResellPrice.flightClub}
                  brand={product.brand}
                  _id={product._id}
                  styleID={product.styleID}
                  resellLinks={product.resellLinks.flightClub}
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

export default FlightClub;
