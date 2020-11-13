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
      const Check = ({ product }) => {
        if (Object.keys(product.resellLinks).length >= 2) {
          return (
            <div key={product._id} className="box">
              <Shoebox
                shoeName={product.shoeName}
                image={product.thumbnail}
                price={product.retailPrice}
                brand={product.brand}
                _id={product._id}
                styleID={product.styleID}
                resellLinks={product.resellLinks}
                description={product.description}
                lowestResellPrice={product.lowestResellPrice}
              />
            </div>
          );
        } else {
          return <></>;
        }
      };
      return (
        <>
          <Hero brands={brand} />
          <main className="main-content">
            <div className="container">
              <h1 className="trending">Brands</h1>
              <div className="grid-main">
                {products.map((product, index) => (
                  <Check product={product} />
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
