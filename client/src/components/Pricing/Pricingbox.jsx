import React from "react";
import "../../sass/Pricingbox.scss";
import Logo from "./Logo";

const Pricingbox = ({
  shoeName,
  image,
  price,
  brand,
  _id,
  resellLinks,
  pricing,
}) => {
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
            <Logo pricing={pricing} />
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
