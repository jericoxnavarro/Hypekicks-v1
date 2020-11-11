import React, { useState, useEffect } from "react";
import Homehero from "./Hero";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Preloader from "../Preloader";

const Home = ({ brand }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`http://localhost:8080/home`);
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, []);

  const renderHome = () => {
    if (products.length === 0) {
      return <Preloader brand={brand} />;
    } else {
      return (
        <>
          <Homehero />
          <main className="main-content">
            <div className="container">
              <h1 className="trending">Trending Now</h1>
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

  return renderHome();
};

export default Home;
