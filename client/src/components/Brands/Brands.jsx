import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Hero from "./Hero";
import Preloader from "../Preloader";
import Footer from "../Footer";
import Pagination from "../Paginations";

const Brands = ({ brand, id }) => {
  const [show, setShow] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setShow([]);
    const getProducts = async () => {
      const Query = () => {
        return new URLSearchParams(location.search);
      };
      let query = Query();
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/brands/${id}?page=${query.get(
          "page"
        )}&limit=20`
      );
      const data = await response.json();
      setShow(data.data);
      setNext(data.next);
      setPrevious(data.previous);
      setPagelength(data.pageLength);
      setCurrentpage(parseInt(query.get("page")));
    };
    getProducts();
  }, [brand, id, currentpage, location]);

  const Render = () => {
    if (show.length === 0) {
      return (
        <>
          <Preloader brand={brand} />
        </>
      );
    } else {
      return (
        <>
          <div className="grid-main">
            {show.map((product) => (
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
          <h1 className="trending">
            Brands / {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </h1>
          <Render />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Brands;
