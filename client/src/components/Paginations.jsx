import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Paginations = ({ location, currentpage, pagelength, previous, next }) => {
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
    } else {
      setOpacityleft(1);
      setPointerleft("auto");
      setOpacityright(1);
      setPointerright("auto");
    }
  }, [location, currentpage, pagelength]);

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
        className="page-btn max"
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
        className="page-btn max"
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

export default Paginations;
