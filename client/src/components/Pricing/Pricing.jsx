import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/Search.scss";
import Pricingbox from "./Pricingbox";
import Mainlogo from "./Mainlogo";
import Footer from "../Footer";
import Preloader from "../Preloader";
import Pagination from "../Paginations";

const Pricing = ({ pricing }) => {
  // Pricing States
  const [search, setSearch] = useState("");
  const [querys, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [next, setNext] = useState(1);
  const [previous, setPrevious] = useState(1);
  const [pagelength, setPagelength] = useState(1);
  const location = useLocation();

  // Pricing Effects
  useEffect(() => {
    setProducts([]);
    const Query = () => {
      return new URLSearchParams(location.search);
    };
    const query = Query();

    const getProducts = async (page, quer) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/search/pricing/${pricing}?query=${quer}&page=${page}&limit=18`
      );
      const data = await response.json();
      setProducts(data.data);
      setNext(data.next);
      setPrevious(data.previous);
      setPagelength(data.pageLength);
    };

    if (query.get("query")) {
      setCurrentpage(parseInt(query.get("page")));
      setQuery(query.get("query"));
      const getQuery = query.get("query").replaceAll("%20", " ");
      const getPage = parseInt(query.get("page"));
      if (querys !== "") {
        if (currentpage === getPage && querys === getQuery) {
          getProducts(currentpage, querys);
        }
      }
    } else {
      setQuery("Jordan 1 Retro High");
      if (querys === "Jordan 1 Retro High") {
        getProducts(currentpage, querys);
      }
    }
  }, [location, querys, currentpage, pricing]);

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
    if (products.length === 0) {
      return <Preloader brand={"home"} />;
    } else {
      return (
        <>
          <div className="grid-main-pricing">
            {products.map((product, index) => (
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
              onChange={(e) => setSearch(e.target.value)}
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

export default Pricing;
