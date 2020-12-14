import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Hero from "./Hero";
import Preloader from "../Preloader";
import Footer from "../Footer";
import Pagination from "../Paginations";

const Brands = ({ brand, id }) => {
  const [products, setProducts] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setProducts([]);

    const Query = () => {
      return new URLSearchParams(location.search);
    };
    let query = Query();

    const getProducts = async (page) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/brands/${id}?page=${page}&limit=20`
      );
      const data = await response.json();
      setProducts(data.data);
      setNext(data.next);
      setPrevious(data.previous);
      setPagelength(data.pageLength);
    };

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
  }, [brand, id, currentpage, location]);

  const Render = () => {
    if (products.length === 0) {
      return (
        <>
          <Preloader brand={brand} />
        </>
      );
    } else {
      return (
        <>
          <div className="grid-main">
            {products.map((product) => (
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

  return (
    <>
      <Hero brands={brand} />
      <main className="main-content">
        <div className="container">
          <h1 className="trending">Brands / {id}</h1>
          <Render />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Brands;
