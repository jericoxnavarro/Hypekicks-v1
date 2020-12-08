import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/Search.scss";
import Pricingbox from "./Pricingbox";
import Mainlogo from "./Mainlogo";
import Footer from "../Footer";
import Preloader from "../Preloader";
import Pagination from "../Paginations";

const FlightClub = ({ pricing }) => {
  const [search, setSearch] = useState("");
  const [querys, setQuery] = useState("");
  const [show, setShow] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();
  useEffect(() => {
    const Query = () => {
      return new URLSearchParams(location.search);
    };
    let query = Query();
    if (query.get("query")) {
      setShow([]);
      const getProducts = async () => {
        setCurrentpage(parseInt(query.get("page")));
        setQuery(query.get("query"));
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/api/search/pricing/${pricing}?query=${querys}&page=${currentpage}&limit=18`
        );
        const data = await response.json();
        setShow(data.data);
        setNext(data.next);
        setPrevious(data.previous);
        setPagelength(data.pageLength);
      };
      getProducts();
    } else {
    }
  }, [currentpage, location, querys, pricing]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const Check = () => {
    const Priceboxcheck = ({ product }) => {
      if (product.lowestResellPrice[pricing] === 0) {
        return <></>;
      } else {
        return (
          <div className="box">
            <Pricingbox
              shoeName={product.shoeName}
              image={product.thumbnail}
              price={product.lowestResellPrice[pricing]}
              brand={product.brand}
              _id={product._id}
              styleID={product.styleID}
              resellLinks={product.resellLinks[pricing]}
              description={product.description}
              lowestResellPrice={product.lowestResellPrice}
              pricing={pricing}
            />
          </div>
        );
      }
    };
    if (show.length === 0) {
      return <Preloader brand={"home"} />;
    } else {
      return (
        <>
          <div className="grid-main-pricing">
            {show.map((product, index) => (
              <Priceboxcheck key={index} product={product} />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              location={location}
              currentpage={currentpage}
              pagelength={pagelength}
              previous={previous}
              next={next}
              query={querys}
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <main className="main-searchhero">
        <div className="container">
          <Mainlogo pricing={pricing} />
          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="search-input"
              placeholder="Search"
              type="text"
              name="search"
              onChange={updateSearch}
            />
            <Link
              className="search-submit"
              type="submit"
              name="submit"
              to={`${location.pathname}?page=1&query=${search}`}
            >
              <i className="fad fa-search"></i>
            </Link>
          </form>
        </div>
      </main>

      <main className="main-content-pricing">
        <div className="container push">
          <h1 className="search-heading">{querys}</h1>
          <p className="search-text">Top Result of {querys}</p>
          <Check />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default FlightClub;
