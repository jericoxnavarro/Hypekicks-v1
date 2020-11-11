import React from "react";
import "../../../sass/Pricingbox.scss";

const Pricingbox = ({ shoeName, image, price, brand, _id, resellLinks }) => {
  let brandlogo;
  if (brand === "Nike" || brand === "Jordan") {
    brandlogo = "./icons/svg/nike.svg";
  } else if (brand === "adidas") {
    brandlogo = "./icons/svg/adidas.svg";
  } else if (brand === "Vans") {
    brandlogo = "./icons/svg/vans.svg";
  } else if (brand === "Converse") {
    brandlogo = "./icons/svg/converse.svg";
  } else if (brand === "New Balance") {
    brandlogo = "./icons/svg/newbalance.svg";
  } else if (brand === "Reebok") {
    brandlogo = "./icons/svg/reebok.svg";
  }

  return (
    <>
      <main key={_id} className="main-pricingbox">
        <div className="shoepic">
          <div className="brand">
            <img src={brandlogo} className="brand-logo" alt={shoeName} />
          </div>
          <img className="shoe" src={image} alt={shoeName} />
        </div>
        <div className="shoeinfo">
          <h2 className="shoe-name">{shoeName}</h2>
          <div className="price-btn">
            <h2 className="price">${price}</h2>
            <p className="from">from</p>
            <svg
              className="Logo__SvgLogo-sc-16hbji1-0 fcjFOZ goat-logo"
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
            <button
              onClick={(e) => {
                window.open(`${resellLinks}`, "_blank");
              }}
              className="addbtn"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pricingbox;
