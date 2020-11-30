import React from "react";
import Lotties from "react-lottie";
import LoaderJSON from "../lottie/404.json";
import "../sass/404.scss";
import { Link } from "react-router-dom";

const Page404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <main className="main-404">
        <div className="container">
          <div className="warning">
            <h1 className="big-text">
              4<span>0</span>4
            </h1>
            <h2 className="semi-text">OPPS! PAGE NOT FOUND</h2>
            <p className="small-text">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <Link className="back-home" to="/">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page404;
