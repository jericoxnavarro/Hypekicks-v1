import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/Search.scss";
import Shoebox from "../Shoebox";
import Pagination from "../Paginations";
import Preloader from "../Preloader";
import Footer from "../Footer";

const Search = () => {
  const [search, setSearch] = useState("");
  const [querys, setQuery] = useState("");
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

    const getProducts = async (page, quer) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/search?query=${quer}&page=${page}&limit=20`
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
  }, [currentpage, location, querys]);

  const Check = () => {
    if (products.length === 0) {
      return <Preloader brand={"home"} />;
    } else {
      return (
        <>
          <div className="grid-main">
            {products.map((product, index) => (
              <div className="box">
                <Shoebox product={product} key={index} />
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
      <main className="main-searchhero">
        <div className="container">
          <div className="brands">
            <svg
              className="nike"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 308.72 161.06"
            >
              <defs>
                <style></style>
              </defs>
              <title>Nike</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    className="cls-1"
                    d="M38.76,55.61s-8,15.06-8,28.09c0,0-.72,30.68,31,30.68h4.34s6.37,2,116.09-30.68H154.42L153,49.24l-13,34.46H120L151.52,0h19.11l-8.68,24L182.5,0h60.22l-5.22,13.9H217l-6.37,17.65h19.11l-6.08,15.64H204.79l-7.52,20.55h22.58l-1.74,6.08S300,52.72,308.72,50.4c0,0-233.49,110.66-271.71,110.66,0,0-36.9.22-36.9-29.89C.11,131.17-4.09,103.09,38.76,55.61Zm135.05,22.3,28-75.66L172.08,33.9ZM128.07,0,97,83.7h19.3L147.57,0ZM41.61,83.7h19.3l13.9-36.48L73.26,83.7H93.72L125,0H105.88L91.6,37,93.91,0H73.26ZM255.07,4.13a4.06,4.06,0,0,1-.55,2.07A4.13,4.13,0,0,1,253,7.71a4.13,4.13,0,0,1-5.64-1.51,4.11,4.11,0,0,1,0-4.14A4.05,4.05,0,0,1,248.88.55a4.15,4.15,0,0,1,4.13,0,4.12,4.12,0,0,1,2.06,3.58Zm-.8,0a3.22,3.22,0,0,0-1-2.36,3.34,3.34,0,0,0-4.71,0,3.22,3.22,0,0,0-1,2.36,3.22,3.22,0,0,0,1,2.36,3.34,3.34,0,0,0,4.71,0A3.22,3.22,0,0,0,254.27,4.13Zm-5.21-2.21h2a1.75,1.75,0,0,1,1.21.34,1.16,1.16,0,0,1,.38.91,1.15,1.15,0,0,1-.29.77,1.67,1.67,0,0,1-.9.47,1.13,1.13,0,0,1,.37.21,2,2,0,0,1,.35.45s.25.43.72,1.27h-1.3a10.69,10.69,0,0,0-.85-1.51.62.62,0,0,0-.44-.24h-.13V6.34h-1.1Zm1.1,1.88h.48a1,1,0,0,0,.67-.16.48.48,0,0,0,.2-.4.53.53,0,0,0-.19-.4,1.06,1.06,0,0,0-.64-.15h-.52Z"
                  />
                </g>
              </g>
            </svg>
            <svg
              className="adidas"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 355.73 236.69"
            >
              <title>Adidas</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M354,192.32H338.45c-.49-2.58-1.23-4.39-2.26-5.41-1.66-1.66-4.49-2.51-8.4-2.51s-6.53.64-8,1.92a5,5,0,0,0-1.72,4c0,2.36,3.27,4.23,9.74,5.68a151.16,151.16,0,0,1,15.95,4.12c.86.32,1.61.59,2.15.85,6.58,3.11,9.84,7.82,9.84,14.14,0,7.7-3.21,13.33-9.58,16.86-.8.43-1.55.8-2.41,1.18a36.35,36.35,0,0,1-14.34,2.67c-8.08,0-14.61-1.45-19.59-4.28a18.51,18.51,0,0,1-7-6.87,19.31,19.31,0,0,1-2.34-9.67h16.27a7.71,7.71,0,0,0,3,6.48c2,1.55,5.35,2.36,10.11,2.36,3.59,0,6.27-.76,8-2.25a5,5,0,0,0,2-4c0-2.51-3.21-4.49-9.58-5.88-9.53-2-15.52-3.7-18-4.88-6.52-3-9.74-7.75-9.74-14.29a18.64,18.64,0,0,1,5.09-13.32c4.28-4.56,10.7-6.81,19.22-6.81,7,0,12.63,1,16.85,3a6.16,6.16,0,0,1,1,.54,17,17,0,0,1,6.89,6.59A19.59,19.59,0,0,1,354,192.32Z" />
                  <path d="M345.67,154.42a1.28,1.28,0,0,0-.21-.8,1.15,1.15,0,0,0-.7-.53,7.44,7.44,0,0,0-1-.17h-2.46v3h2.46a2.29,2.29,0,0,0,1.45-.43A1.35,1.35,0,0,0,345.67,154.42Zm1.29-1.61a2.38,2.38,0,0,1,.48,1.45,2.59,2.59,0,0,1-.81,1.92,3.09,3.09,0,0,1-2.08.92,2.48,2.48,0,0,1,.85.53l1.5,2,1.18,2h-1.93l-.91-1.6a8.86,8.86,0,0,0-1.5-2.14.63.63,0,0,0-.21-.16l-1.28-.38h-1v4.28h-1.61V151.53h3.48c.22,0,.43.05.59.05a5.71,5.71,0,0,1,1.93.27A2.36,2.36,0,0,1,347,152.81Z" />
                  <path d="M351.51,156.46a7.79,7.79,0,0,0-1-3.91,7.5,7.5,0,0,0-2.89-2.89,8.3,8.3,0,0,0-3.81-1h-.05a8.25,8.25,0,0,0-3.79,1,7.46,7.46,0,0,0-2.9,2.89,7.57,7.57,0,0,0,0,7.76,7.29,7.29,0,0,0,2.84,2.83,7.66,7.66,0,0,0,3.85,1h.05a7.64,7.64,0,0,0,3.86-1,7.22,7.22,0,0,0,2.84-2.83A7.76,7.76,0,0,0,351.51,156.46Zm1.55,0a9.12,9.12,0,0,1-1.24,4.6,8,8,0,0,1-3.42,3.42,9,9,0,0,1-4.61,1.24h-.05a9,9,0,0,1-4.6-1.24,8.14,8.14,0,0,1-3.43-3.42,9.21,9.21,0,0,1-1.23-4.6,9.35,9.35,0,0,1,1.23-4.72,8.74,8.74,0,0,1,3.48-3.42,10.09,10.09,0,0,1,4.55-1.23h.05a9.51,9.51,0,0,1,4.55,1.23,8.2,8.2,0,0,1,3.48,3.42A9.26,9.26,0,0,1,353.06,156.46Z" />
                  <polygon points="262.01 80.82 305.96 154.05 262.01 154.05 235.35 154.05 193.39 84.09 161.6 31.15 193.39 12.04 213.41 0 262.01 80.82" />
                  <path d="M293.91,204.89v30H279.3V231.6a31.24,31.24,0,0,1-17.13,5.09H262a31.8,31.8,0,0,1,0-63.59h.16a31.39,31.39,0,0,1,17.13,5.08v-3.47h14.61Zm-14.61,3.33v-6.64a17.52,17.52,0,0,0-17.13-14.14H262a17.48,17.48,0,0,0,0,35h.16A17.57,17.57,0,0,0,279.3,208.22Z" />
                  <path d="M225.29,204.89v30H210.68V231.6a31.34,31.34,0,0,1-17.13,5.09h-.16a31.8,31.8,0,0,1,0-63.59h.16a31.49,31.49,0,0,1,17.13,5.08V154.05h14.61Zm-14.61,3.33v-6.64a17.52,17.52,0,0,0-17.13-14.14h-.16a17.48,17.48,0,0,0,0,35h.16A17.57,17.57,0,0,0,210.68,208.22Z" />
                  <polygon points="193.39 125.25 210.62 154.05 193.39 154.05 140.07 154.05 100.9 88.86 99.19 86.02 100.9 85 151.05 54.81 193.39 125.25" />
                  <rect x="140.13" y="173.1" width="15.9" height="61.82" />
                  <rect x="140.13" y="154.37" width="15.9" height="13.97" />
                  <path d="M132.85,204.89v30H118.24V231.6a31.53,31.53,0,0,1-17.18,5.09h-.16a31.8,31.8,0,0,1,0-63.59h.16a31.69,31.69,0,0,1,17.18,5.08V154.05h14.61Zm-14.61,3.33v-6.64a17.53,17.53,0,0,0-17.18-14.14h-.16a17.48,17.48,0,0,0,0,35h.16A17.57,17.57,0,0,0,118.24,208.22Z" />
                  <polygon points="100.9 129.96 115.35 154.05 100.9 154.05 44.75 154.05 36.83 140.83 88.69 109.67 100.9 129.96" />
                  <path d="M63.53,204.89v30H48.92V231.6a31.53,31.53,0,0,1-17.18,5.09h-.16a31.8,31.8,0,0,1,0-63.59h.16a31.69,31.69,0,0,1,17.18,5.08v-3.47H63.53Zm-14.61,3.33v-6.64a17.53,17.53,0,0,0-17.18-14.14h-.16a17.48,17.48,0,0,0,0,35h.16A17.57,17.57,0,0,0,48.92,208.22Z" />
                </g>
              </g>
            </svg>
            <svg
              className="vans"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 175.75 117.85"
            >
              <defs>
                <style></style>
              </defs>
              <title>Vans</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <polygon
                    className="cls-1"
                    points="0 0 18.64 0 28.97 71.03 39.04 0 166.75 0 162.47 20.4 54.66 20.4 38.29 113.85 19.65 113.85 0 0 0 0"
                  />
                  <path
                    className="cls-1"
                    d="M170,87.4c.51,11.09-5.79,28-19.64,28-16.13,0-19.65-19.9-19.65-28.21h13.1c0,4.79,4,9.57,7,9.57s6-3.77,6-6.29-1-6.3-5.79-9.57C135.51,71.54,132,60.7,132,51.38c-.51-11.08,4.78-27.45,18.64-27.45s17.63,19.39,17.63,27.45H155.92c0-4.53-3-7.8-6-7.8s-5,3-5,5.54.51,4.78,5.29,8.06C156.67,60.2,170,70,170,87.4Z"
                  />
                  <path
                    className="cls-1"
                    d="M170.77,108.81a4.05,4.05,0,1,1-4.06,4,4,4,0,0,1,4.06-4v-.94a5,5,0,1,0,5,5,5,5,0,0,0-5-5v.94Z"
                  />
                  <path
                    className="cls-1"
                    d="M169.77,111h1.31c.52,0,1.28,0,1.28.7s-.42.83-1,.82h-1.57v.79h1l1.2,2.29h1.23l-1.31-2.29c.95-.06,1.47-.46,1.47-1.44a1.57,1.57,0,0,0-.63-1.4,2.94,2.94,0,0,0-1.46-.26h-2.61v5.39h1.06V111Z"
                  />
                  <path
                    className="cls-1"
                    d="M61.21,83.62l5-32.74,5,32.74Zm-3,18.39H73.8l2,11.84h24.93V67l15.37,46.85H129V26.7h-13.1V71L101.26,26.7H87.66v81.86L73.55,26.7H58.94L43.83,113.85H56.67L58.19,102Z"
                  />
                </g>
              </g>
            </svg>
            <svg
              className="converse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.76 192.76"
            >
              <defs>
                <style></style>
              </defs>
              <title>Converse</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <polygon
                    className="cls-1"
                    points="0 0 192.76 0 192.76 192.76 0 192.76 0 0 0 0"
                  />
                  <path
                    className="cls-2"
                    d="M43.6,83.51h-15a4.74,4.74,0,0,0-4.74,4.74v16.19a4.74,4.74,0,0,0,4.74,4.74h15a4.75,4.75,0,0,0,4.75-4.74V88.25a4.75,4.75,0,0,0-4.75-4.74ZM41.1,98.43l3.4,10-8.12-6.31-7.86,6.25,3.13-9.76-7.24-5.49h9l2.86-8.94,3,8.94h8.45L41.1,98.43Z"
                  />
                  <path
                    className="cls-2"
                    d="M101.91,109.25a5.54,5.54,0,0,1-5.54-5.53V89.56A5.54,5.54,0,0,1,101.91,84h13.68v6.78H103.67v2.44h11.92V100H103.67v2.43h11.92v6.79Z"
                  />
                  <path
                    className="cls-2"
                    d="M71.37,89.56A5.53,5.53,0,0,0,65.84,84H50.74v25.22h7.31V90.81h6v18.44h7.3V89.56Z"
                  />
                  <path
                    className="cls-2"
                    d="M8.37,109.25a5.54,5.54,0,0,1-5.54-5.53V89.56A5.53,5.53,0,0,1,8.37,84H21.8v6.78H10.14v11.65H21.8v6.79Z"
                  />
                  <polygon
                    className="cls-2"
                    points="71.06 84.03 78.62 84.03 83.62 99.39 88.74 84.03 96.3 84.03 87.84 109.25 79.39 109.25 71.06 84.03 71.06 84.03"
                  />
                  <path
                    className="cls-2"
                    d="M156.13,109.25a5.54,5.54,0,0,0,5.54-5.53V98.78a5.53,5.53,0,0,0-5.54-5.53h-7.66V90.81h12.3V84H146.7a5.53,5.53,0,0,0-5.53,5.53V94.5A5.53,5.53,0,0,0,146.7,100h7.79v2.43H141.16v6.79Z"
                  />
                  <path
                    className="cls-2"
                    d="M183.07,109.25H169.39a5.54,5.54,0,0,1-5.54-5.53V89.56A5.54,5.54,0,0,1,169.39,84h13.68v6.78H171.15v2.44h11.92V100H171.15v2.43h11.92v6.79Z"
                  />
                  <path
                    className="cls-2"
                    d="M135,99.67a5.53,5.53,0,0,0,3.58-5.17V89.56A5.54,5.54,0,0,0,133.06,84H118.22v25.22h7.31V94.91l6.53,14.34h7.44L135,99.67Zm-3.47-6.44h-6V90.8h6v2.43Z"
                  />
                  <path
                    className="cls-2"
                    d="M189.19,85.15a2.44,2.44,0,0,0-1.77-.72,2.48,2.48,0,0,0-2.48,2.48,2.44,2.44,0,0,0,.72,1.77,2.5,2.5,0,0,0,3.53-3.53Zm-.25,3.29a2.14,2.14,0,0,1-3,0,2.16,2.16,0,0,1,0-3,2.14,2.14,0,0,1,3,0,2.16,2.16,0,0,1,0,3Z"
                  />
                  <path
                    className="cls-2"
                    d="M188.54,88.24a.38.38,0,0,1,0-.15c0-.07,0-.14,0-.2v-.2a.78.78,0,0,0-.14-.42.65.65,0,0,0-.48-.27,1.1,1.1,0,0,0,.4-.13.61.61,0,0,0,.27-.54.68.68,0,0,0-.43-.7,2.19,2.19,0,0,0-.74-.09h-1v2.73h.48V87.19h.38a1.14,1.14,0,0,1,.54.09.67.67,0,0,1,.26.63v.36h.45v0Zm-.75-1.45a1.28,1.28,0,0,1-.45.06h-.44v-1h.41a1.34,1.34,0,0,1,.58.1.49.49,0,0,1-.1.83Z"
                  />
                </g>
              </g>
            </svg>
            <svg
              className="newbalance"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 187.09 86.61"
            >
              <defs>
                <style></style>
              </defs>
              <title>Newbalance</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <polygon
                    className="cls-1"
                    points="77.49 39.66 55.98 40.43 76.4 41.56 77.49 39.66 77.49 39.66 77.49 39.66"
                  />
                  <polygon
                    className="cls-1"
                    points="74.92 44.18 53.35 44.95 73.86 46.09 74.92 44.18 74.92 44.18 74.92 44.18"
                  />
                  <polygon
                    className="cls-1"
                    points="72.34 48.74 50.81 49.49 71.28 50.63 72.34 48.74 72.34 48.74 72.34 48.74"
                  />
                  <polygon
                    className="cls-1"
                    points="69.82 53.27 48.26 54.04 68.71 55.18 69.82 53.27 69.82 53.27 69.82 53.27"
                  />
                  <polygon
                    className="cls-1"
                    points="96.18 16.85 68.72 17.82 96.26 19.35 96.18 16.85 96.18 16.85 96.18 16.85"
                  />
                  <polygon
                    className="cls-1"
                    points="96 12.36 71.34 13.22 96.08 14.64 96 12.36 96 12.36 96 12.36"
                  />
                  <polygon
                    className="cls-1"
                    points="95.83 8.03 73.86 8.76 95.93 9.98 95.83 8.03 95.83 8.03 95.83 8.03"
                  />
                  <polygon
                    className="cls-1"
                    points="95.68 3.59 76.42 4.23 95.76 5.38 95.68 3.59 95.68 3.59 95.68 3.59"
                  />
                  <polygon
                    className="cls-1"
                    points="95.56 0 78.81 0 95.58 0.89 95.56 0 95.56 0 95.56 0"
                  />
                  <polygon
                    className="cls-1"
                    points="67.22 57.81 45.72 58.59 66.78 58.59 67.22 57.81 67.22 57.81 67.22 57.81"
                  />
                  <path
                    className="cls-1"
                    d="M140.12.14h-31l-.88,1.56,15.51.82h0c.18,0,.18.26-.07.26h0l-16.34.55-1.58,2.76L121.17,7h0c.2,0,.15.31,0,.31h0l-16.36.53-1.53,2.64,15.38.86h0c.34,0,.34.31,0,.31h0l-16.33.57L100.74,15l15.33.88h0c.34,0,.32.34,0,.34h0l-16.33.58-1.58,2.73,15.36.85h0c.23,0,.25.31-.06.31h0L66.39,22.25l44.67,2.48h0c.28,0,.26.36,0,.36h0L63.85,26.77l44.68,2.48h0c.2,0,.25.34,0,.34h0L61.24,31.3l44.68,2.48h0c.18,0,.36.36,0,.39h0L58.73,35.85l44.68,2.48h0c.13,0,.26.36,0,.36h0l-23.74.85.08,2.14,21.15,1.17h0c.15,0,.23.34,0,.34h0l-21,.75.1,2.39,18.36,1h0a.2.2,0,0,1-.06.39h0L80,48.38,80.06,51l15.64.86h0a.19.19,0,0,1-.07.37h0l-15.49.55.1,2.89,12.93.72h0c.18,0,.18.33-.08.33h0L80.3,57.2l0,1.24h41.72c11.07,0,21-8.07,22.86-14.48s1.86-12.2-7-15.09c5-1.14,13.6-6.74,15.31-14.48,1.55-7-1-14.22-13.08-14.25Zm-21,44.9H106.31l7.24-12.82h9.51c9.82,0,5.07,12.82-3.93,12.82Zm16.6-27.5c-.42,1.55-3.52,5.48-7.45,5.48h-9.51l6.1-10.76h4.86c6.2.21,6.41,3.73,6,5.28Z"
                  />
                  <path
                    className="cls-1"
                    d="M187.09,77a9.2,9.2,0,0,0-9.1-9.13,9.36,9.36,0,0,0-9.26,9.42,9.25,9.25,0,0,0,9.29,9.3,8.94,8.94,0,0,0,8.42-6.1h-4.71a4.21,4.21,0,0,1-3.84,2.16,4.88,4.88,0,0,1-4.64-3.52h13.61a12.41,12.41,0,0,0,.23-2.13Zm-14-1.24a5,5,0,0,1,4.93-4,4.86,4.86,0,0,1,4.84,4h-9.77Z"
                  />
                  <path
                    className="cls-1"
                    d="M125.92,68.75V70.2h0a7.37,7.37,0,0,0-5.41-2.27,8.87,8.87,0,0,0-8.61,9.13c0,4.87,3.5,9.24,8.7,9.24a6.8,6.8,0,0,0,5.68-2.4h0v2.29h3.93V68.75ZM121.11,82.6a5.41,5.41,0,1,1,5.41-5.41,5.41,5.41,0,0,1-5.41,5.41Z"
                  />
                  <path
                    className="cls-1"
                    d="M8.58,67.89A6,6,0,0,0,4,70H4V68.31H0V86.19H4.29V77.77h0c0-2.3.19-5.94,3.36-5.94,3,0,3.29,3.42,3.29,5.61h0v8.75h4.29V76.6h0a10.55,10.55,0,0,0-.87-5.13,6.5,6.5,0,0,0-5.78-3.58Z"
                  />
                  <path
                    className="cls-1"
                    d="M35.25,77a9.2,9.2,0,0,0-9.1-9.13,9.36,9.36,0,0,0-9.26,9.42,9.25,9.25,0,0,0,9.29,9.3,8.94,8.94,0,0,0,8.42-6.1H29.89a4.21,4.21,0,0,1-3.84,2.16,4.88,4.88,0,0,1-4.64-3.52H35A12.41,12.41,0,0,0,35.25,77Zm-14-1.24a5,5,0,0,1,4.93-4,4.86,4.86,0,0,1,4.84,4H21.28Z"
                  />
                  <polygon
                    className="cls-1"
                    points="105.85 86.17 110.14 86.17 110.14 62.33 105.85 62.33 105.85 86.17 105.85 86.17 105.85 86.17"
                  />
                  <path
                    className="cls-1"
                    d="M141.54,67.89A6,6,0,0,0,136.92,70h0V68.31h-4V86.19h4.29V77.77h0c0-2.3.2-5.94,3.36-5.94,3,0,3.29,3.42,3.29,5.61h0v8.75h4.29V76.6h0a10.55,10.55,0,0,0-.87-5.13,6.49,6.49,0,0,0-5.77-3.58Z"
                  />
                  <path
                    className="cls-1"
                    d="M158.89,71.83a4.24,4.24,0,0,1,4.17,2.45h4.83a9.22,9.22,0,0,0-8.83-6.39,9.36,9.36,0,0,0-9.43,9.3,9.46,9.46,0,0,0,9.43,9.42,9.59,9.59,0,0,0,7-3.13,7.87,7.87,0,0,0,1.8-3.16h-4.83a4.53,4.53,0,0,1-3.91,2.35,5.19,5.19,0,0,1-5.23-5.42c0-3.13,2.13-5.42,5-5.42Z"
                  />
                  <polygon
                    className="cls-1"
                    points="51.65 79.22 48.61 68.31 45.16 68.31 42.09 79.22 38.45 68.31 34.66 68.31 40.63 86.19 43.38 86.19 46.87 74.61 50.26 86.19 53.14 86.19 58.86 68.31 55.31 68.31 51.65 79.22 51.65 79.22 51.65 79.22"
                  />
                  <path
                    className="cls-1"
                    d="M74.64,67.91a7.36,7.36,0,0,0-5.41,2.28h0V62.33h-4.3V86.17h3.94V83.88h0a6.8,6.8,0,0,0,5.68,2.4c5.19,0,8.7-4.37,8.7-9.24a8.87,8.87,0,0,0-8.61-9.13ZM74,82.6a5.41,5.41,0,1,1,5.41-5.41A5.41,5.41,0,0,1,74,82.6Z"
                  />
                  <path
                    className="cls-1"
                    d="M98.69,68.75V70.2h0a7.35,7.35,0,0,0-5.41-2.27,8.87,8.87,0,0,0-8.61,9.13c0,4.87,3.5,9.24,8.7,9.24a6.8,6.8,0,0,0,5.68-2.4h0v2.29H103V68.75ZM93.88,82.6a5.41,5.41,0,1,1,5.42-5.41,5.41,5.41,0,0,1-5.42,5.41Z"
                  />
                </g>
              </g>
            </svg>
            <svg
              className="reebok"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 213.05 44.85"
            >
              <defs>
                <style></style>
              </defs>
              <title>Reebok</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    className="cls-1"
                    d="M.05.09c6.9,0,13.8-.1,20.7,0,5,.2,10.7,1.9,13.3,6.6,2.9,5.5,2,13.5-3.6,17-2.7,1.9-6.1,2-9.3,2.3,5.3,5.8,10.4,11.8,15.8,17.6-3.7.1-7.3,0-10.9,0-5.9-6.3-11.4-12.9-17.4-19-.1,6.3,0,12.7,0,19H.05V.09Zm158,16.1c3.6-.7,8.2.8,8.7,4.9a49.6,49.6,0,0,1,.1,10.9c-.8,6.7-12,7-13.8.7-.6-3.5-.3-7.1-.2-10.6a5.94,5.94,0,0,1,5.2-5.9Zm-74.2.9a9.35,9.35,0,0,1,9.8,0c1.9,1.2,2.1,3.7,2.7,5.6-5,.2-10,.1-15,0,.5-1.9.6-4.3,2.5-5.6Zm-35-.1a8.8,8.8,0,0,1,9.6.3c1.8,1.2,2,3.6,2.6,5.5-5.1,0-10.1.1-15.1,0,.6-2.1.8-4.7,2.9-5.8ZM8.55,7.69c5.2.2,10.6-.8,15.6.8,4.7,1.6,4.7,9.5-.3,10.5s-10.2.4-15.3.6c.1-4,.1-8,0-11.9Zm113.6,8.7c3.6-.9,8.7.5,9.3,4.8a76.42,76.42,0,0,1,0,10.7c-.6,6.7-12.1,7.3-13.8,1-.7-3.6-.3-7.3-.2-10.9a5.78,5.78,0,0,1,4.7-5.6Zm31-6.8c6.8-2.2,15.7-1.3,20,4.9,3.4,4.9,2.1,11.1,2.3,16.6a12.9,12.9,0,0,1-9,12.6c-5.9,1.8-13,1.4-17.8-2.6-3.5-3-4.6-7.7-4.4-12.1s-.6-9,1.5-13.1a12.83,12.83,0,0,1,7.4-6.3Zm-75.9,2.9c6.3-5.3,16.7-5.3,23,0,4.7,4.1,4.3,10.8,4.2,16.4-7.7.4-15.4,0-23.1.3.5,2.3.5,5,2.5,6.6,2.5,1.8,5.9,1.9,8.8,1.3,2.2-.4,3.2-2.5,5-3.7,2.3,0,4.6.1,6.9.2-.8,2.9-1.6,6.1-4.2,8-4.2,3.4-10.1,3.5-15.2,2.8-6.5-.9-12.1-6.7-11.9-13.4,0-6.3-1.2-13.8,4-18.5Zm-35.7.3c6.3-5.8,17.2-5.7,23.6-.2,4.5,4.1,4,10.7,3.9,16.3-7.7.4-15.4,0-23.1.3.5,2.6.7,5.8,3.4,7.2,4,1.7,10.2,1.8,12.2-2.9h7.6c-.7,2.9-1.5,6-3.9,8-4,3.3-9.5,3.4-14.4,3.1-6.8-.6-13.2-6.4-12.9-13.5.1-6.2-1.4-13.6,3.6-18.3ZM179.85.09h8.5c0,7.8-.1,15.5.1,23.2,4.4-4.8,8.8-9.7,13-14.7,3.6,0,7.1-.1,10.7,0-5,5.8-10.1,11.5-15.2,17.3,5.4,5.8,10.6,11.8,16,17.7-3.6.1-7.2,0-10.8,0-4.6-5-9.1-10.2-13.8-15.2v15.2h-8.5c.1-14.5,0-29,0-43.5Zm-71,0h8.5c-.1,3.5,0,6.9-.1,10.4a17.73,17.73,0,0,1,16.6.4c4.1,2.4,6.3,7.3,6.3,12.1-.2,5.5.9,11.9-2.9,16.5-5.2,6.3-15.1,6.6-21.9,3-2.2-1.2-4.2,1.1-6.4,1.4-.2-14.6,0-29.2-.1-43.8Z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <form className="search">
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
              <i class="fad fa-search"></i>
            </Link>
          </form>
        </div>
      </main>

      <main className="main-content">
        <div className="container">
          <h1 className="search-heading">{querys}</h1>
          <p className="search-text">Top Result of {querys}</p>
          <Check />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Search;
