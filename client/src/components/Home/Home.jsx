import React, { useState, useEffect } from "react";
import Homehero from "./Hero";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Preloader from "../Preloader";
import Footer from "../Footer";

const Home = ({ brand }) => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://hypekicks-api.herokuapp.com/api/popular`
      );
      const data = await response.json();
      setProducts(data[0].sneakers);
    };
    getProducts();
  }, []);

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
                {show.map((product, index) => (
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

  return renderHome();
};

export default Home;
