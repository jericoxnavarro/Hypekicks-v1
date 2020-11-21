import React, { useState, useEffect } from "react";
import "../../sass/Shoebox.scss";
import Links from "../Scripts/Imagelinks";
import Brandlogo from "../Scripts/Brandlogo";
import Brandlogosvg from "../Scripts/Brandlogo.svg";
import Logo from "../Pricing/Logo";

const Favorites = ({ product }) => {
  const [infoboxDisplay, setinfoboxDisplay] = useState("none");
  const [visibilityBTN, setvisibilityBTN] = useState(1);
  const [pointerBTN, setpointerBTN] = useState("auto");

  const [images, setImages] = useState(product.thumbnail);
  const [link, setLink] = useState(0);
  const imgLINKS = Links(product.thumbnail, product.shoeName);

  useEffect(() => {
    let Links = imgLINKS[link];
    setImages(Links);
    fetch(Links).then((res) => {
      if (res.status === 404) {
        setImages(product.thumbnail);
        setvisibilityBTN(0);
        setpointerBTN("none");
      }
    });
  }, [link]);

  let buttons = [];
  for (let i = 0; i <= 35; i++) {
    buttons.push(
      <button
        key={i}
        onMouseEnter={() => setLink(i)}
        style={
          link === i
            ? {
                borderRadius: "50%",
                transform: "scale(2.1)",
                backgroundColor: "#7de89d",
                zIndex: "12",
              }
            : {
                borderRadius: "0%",
                transform: "scale(1)",
                backgroundColor: "#043353",
              }
        }
        className="circle-btn"
      ></button>
    );
  }
  return (
    <>
      <main className="main-shoebox" onClick={() => setinfoboxDisplay("block")}>
        <div className="image-box">
          <div className="brand">
            <Brandlogosvg brand={product.brand} />
          </div>
          <img className="shoe" src={product.thumbnail} alt="Shoe" />
        </div>
        <div className="info-box">
          <h2 className="shoe-name">{product.shoeName}</h2>
          <div className="price-btn">
            <h2 className="price">${product.price}</h2>
            <p className="from">from</p>
            <Logo pricing={product.store} />
          </div>
        </div>
      </main>

      <div className="shoe-info-box" style={{ display: infoboxDisplay }}>
        <div className="info-box">
          <div className="shoe-images">
            <img className="shoe" src={images} alt={product.styleID} />
            <i
              onClick={() => setinfoboxDisplay("none")}
              className="fad fa-times-circle"
            ></i>
            <div
              style={{ opacity: visibilityBTN, pointerEvents: pointerBTN }}
              className="btns"
            >
              {buttons}
            </div>
            <div className="brand-main">
              <Brandlogosvg brand={product.brand} />
            </div>
          </div>
          <div className="shoe-infos">
            <h1 className="shoename">{product.shoeName}</h1>
            <button className="addfav-btn remove">Remove</button>
            <div className="resellers">
              <div className="resellers-price fav">
                <h2 className="price-fav">${product.price}</h2>
                <p className="from">from</p>
                <Logo pricing={product.store} />
              </div>
            </div>
            <p className="description fav-des">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
