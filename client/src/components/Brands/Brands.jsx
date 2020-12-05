import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/Content.scss";
import Shoebox from "../Shoebox";
import Hero from "./Hero";
import Preloader from "../Preloader";
import Footer from "../Footer";

const Brands = ({ brand, id }) => {
  const [show, setShow] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();
  useEffect(() => {
    const getProducts = async () => {
      const Query = () => {
        return new URLSearchParams(location.search);
      };
      let query = Query();
      const response = await fetch(
        `http://localhost:3002/api/brands/${id}?page=${query.get(
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

  const GeneratePaginations = () => {
    const [opacityleft, setOpacityleft] = useState(1);
    const [pointerleft, setPointerleft] = useState("auto");
    const [opacityright, setOpacityright] = useState(1);
    const [pointerright, setPointerright] = useState("auto");

    useEffect(() => {
      if (currentpage === 1) {
        setOpacityleft(0);
        setPointerleft("none");
      } else if (currentpage === pagelength) {
        setOpacityright(0);
        setPointerright("none");
      }
    }, []);

    return (
      <>
        <Link
          to={`${location.pathname}?page=${previous}`}
          className="previous"
          style={{ opacity: opacityleft, pointerEvents: pointerleft }}
        >
          <i className="fad fa-angle-left"></i>
        </Link>
        <Link
          style={{ opacity: opacityleft, pointerEvents: pointerleft }}
          className="page-btn"
          to={`${location.pathname}?page=${1}`}
        >
          {1}
        </Link>
        <Link
          style={{ opacity: opacityleft, pointerEvents: pointerleft }}
          to={`${location.pathname}?page=${previous}`}
          className="page-btn"
        >
          {previous}
        </Link>
        <div className="page-btn current">{currentpage}</div>
        <Link
          style={{ opacity: opacityright, pointerEvents: pointerright }}
          to={`${location.pathname}?page=${next}`}
          className="page-btn"
        >
          {next}
        </Link>
        <Link
          style={{
            opacity: opacityright,
            pointerEvents: pointerright,
          }}
          to={`${location.pathname}?page=${pagelength}`}
          className="page-btn"
        >
          {pagelength}
        </Link>
        <Link
          style={{ opacity: opacityright, pointerEvents: pointerright }}
          to={`${location.pathname}?page=${next}`}
          className="next"
        >
          <i className="fad fa-angle-right"></i>
        </Link>
      </>
    );
  };

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
              <div className="pagination">
                <GeneratePaginations />
              </div>
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
