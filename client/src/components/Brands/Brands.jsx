import React, { useState, useEffect } from "react";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Hero from "./Hero";
import Preloader from "../Preloader";
import Footer from "../Footer";

const Brands = ({ brand, id }) => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/brands/${id}`
      );
      const data = await response.json();
      setProducts(data.sneakers);
    };
    getProducts();
  }, [brand]);

  useEffect(() => {
    const boxperPage = 60;
    const starting = currentpage * boxperPage - boxperPage;
    const ending = currentpage * boxperPage;
    const inShow = [];
    for (let i = starting; i < ending; i++) {
      if (products[i] === undefined) {
        break;
      } else {
        inShow.push(products[i]);
      }
    }
    setShow(inShow);
  }, [currentpage, products]);

  const paginationLength = products.length / 60;
  let buttons = [];
  for (let i = 0; i < Math.ceil(paginationLength); i++) {
    buttons.push(
      <button
        key={i + 1}
        onClick={() => setCurrentpage(i + 1)}
        className="page-btn"
      >
        {i + 1}
      </button>
    );
  }

  const renderBrands = () => {
    if (show.length === 0) {
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
              <h1 className="trending">
                Brands / {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </h1>
              <div className="grid-main">
                {show.map((product) => (
                  <div key={product._id} className="box">
                    <Shoebox product={product} />
                  </div>
                ))}
              </div>
              <div className="pagination">{buttons}</div>
            </div>
            <Footer />
          </main>
        </>
      );
    }
  };

  return renderBrands();
};

export default Brands;
