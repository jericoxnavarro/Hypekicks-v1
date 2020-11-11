import React from "react";
import "../../sass/heroContent.scss";
import Shoebox from "../Shoebox";

const heroContent = ({ products }) => {
  return (
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
  );
};

export default heroContent;
