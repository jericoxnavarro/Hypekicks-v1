import React, { useState, useEffect } from "react";
import "../../sass/Shoebox.scss";
import Links from "../Scripts/Imagelinks";
import Brandlogo from "../Scripts/Brandlogo";
import Logo from "../Pricing/Logo";

const Favorites = () => {
  const [infoboxDisplay, setinfoboxDisplay] = useState("none");
  const [visibilityBTN, setvisibilityBTN] = useState(1);
  return (
    <>
      <main className="main-shoebox">
        <div className="image-box">
          <div className="brand">
            <img src={Brandlogo("Nike")} className="brand-logo" alt={"Nike"} />
          </div>
          <img
            className="shoe"
            src="https://stockx.imgix.net/Nike-Air-Rubber-Dunk-Off-White-UNC-Product.jpg"
            alt="Shoe"
          />
        </div>
        <div className="info-box">
          <h2 className="shoe-name">Nike Air Rubber Dunk Off-White UNC</h2>
          <div className="price-btn">
            <h2 className="price">$900</h2>
            <p className="from">from</p>
            <Logo pricing="stockX" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;
