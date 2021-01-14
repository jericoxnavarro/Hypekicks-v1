import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Homehero from "./Hero";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Preloader from "../Preloader";
import Footer from "../Footer";
import Pagination from "../Paginations";

const Home = ({ brand }) => {
  // Home States
  const [products, setProducts] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();

  // Home Effects
  useEffect(() => {
    // Set Products to empty to promt the prelaoder
    setProducts([]);

    // Get URL Queries
    const Query = () => {
      return new URLSearchParams(location.search);
    };
    let query = Query();

    // Get Products/Shoes Data in the Hypekicks API
    const getProducts = async (page) => {
      const response = await fetch(`/api/popular?page=${page}&limit=20`);
      const data = await response.json();
      setProducts(data.data);
      setNext(data.next);
      setPrevious(data.previous);
      setPagelength(data.pageLength);
    };

    // Check if theres a URL Queary
    if (query.get("page")) {
      setCurrentpage(parseInt(query.get("page")));
      const getPage = parseInt(query.get("page"));
      if (getPage === currentpage) {
        getProducts(getPage);
      }
    } else {
      setCurrentpage(1);
      getProducts(1);
    }
  }, [brand, currentpage, location]);

  // Check if products is available if not preloader will show
  const Render = () => {
    if (products.length === 0) {
      return <Preloader brand={brand} />;
    } else {
      return (
        <>
          <div className="grid-main">
            {products.map((product, index) => (
              <div key={product._id} className="box">
                <Shoebox product={product} />
              </div>
            ))}
          </div>
          <div className="pagination">
            <Pagination
              location={location}
              currentpage={currentpage}
              pagelength={pagelength}
              previous={previous}
              next={next}
            />
          </div>
        </>
      );
    }
  };

  // Render Home Component
  return (
    <>
      <Homehero />
      <main className="main-content">
        <div className="container">
          <h1 className="trending">Trending Now</h1>
          <Render />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
