import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Paginations = ({
  location,
  currentpage,
  pagelength,
  previous,
  next,
  query,
}) => {
  const [opacityleft, setOpacityleft] = useState(1);
  const [pointerleft, setPointerleft] = useState("auto");
  const [opacityright, setOpacityright] = useState(1);
  const [pointerright, setPointerright] = useState("auto");
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (currentpage === 1) {
      setOpacityleft(0);
      setPointerleft("none");
    } else if (currentpage === pagelength) {
      setOpacityright(0);
      setPointerright("none");
    } else {
      setOpacityleft(1);
      setPointerleft("auto");
      setOpacityright(1);
      setPointerright("auto");
    }
    if (currentpage === next) {
      setOpacityright(0);
      setPointerright("none");
    }
    if (query) {
      setHeader(`&query=${query}`);
    }
  }, [location, currentpage, pagelength, next, query]);
  return (
    <>
      <Link
        to={`${location.pathname}?page=${previous}${header}`}
        className="previous"
        style={{ opacity: opacityleft, pointerEvents: pointerleft }}
      >
        <i className="fad fa-angle-left"></i>
      </Link>
      <Link
        style={{ opacity: opacityleft, pointerEvents: pointerleft }}
        className="page-btn max"
        to={`${location.pathname}?page=${1}${header}`}
      >
        {1}
      </Link>
      <Link
        style={{ opacity: opacityleft, pointerEvents: pointerleft }}
        to={`${location.pathname}?page=${previous}${header}`}
        className="page-btn"
      >
        {previous}
      </Link>
      <div className="page-btn current">{currentpage}</div>
      <Link
        style={{ opacity: opacityright, pointerEvents: pointerright }}
        to={`${location.pathname}?page=${next}${header}`}
        className="page-btn"
      >
        {next}
      </Link>
      <Link
        style={{
          opacity: opacityright,
          pointerEvents: pointerright,
        }}
        to={`${location.pathname}?page=${pagelength}${header}`}
        className="page-btn max"
      >
        {pagelength}
      </Link>
      <Link
        style={{ opacity: opacityright, pointerEvents: pointerright }}
        to={`${location.pathname}?page=${next}${header}`}
        className="next"
      >
        <i className="fad fa-angle-right"></i>
      </Link>
    </>
  );
};

export default Paginations;
