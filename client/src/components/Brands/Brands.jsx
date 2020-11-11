import React, { useState, useEffect } from "react";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Hero from "./Hero";
import Preloader from "../Preloader";

const Brands = ({ brand }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`http://localhost:8080/search/${brand}`);
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, [brand]);

  const renderBrands = () => {
    if (products.length === 0) {
      return (
        <>
          <Preloader brand={brand} />
        </>
      );
    } else {
      return (
        <>
          <Hero brands={brand} />
          <main className="main-content">
            <div className="container">
              <h1 className="trending">Brands</h1>
              <div className="grid-main">
                {products.map((product, index) => (
                  <div key={product._id} className="box">
                    <Shoebox
                      shoeName={product.shoeName}
                      image={product.thumbnail}
                      price={product.lowestResellPrice.stockX}
                      brand={product.brand}
                      _id={product._id}
                      styleID={product.styleID}
                      resellLinks={product.resellLinks}
                      description={product.description}
                      lowestResellPrice={product.lowestResellPrice}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      );
    }
  };

  return renderBrands();
};

export default Brands;
