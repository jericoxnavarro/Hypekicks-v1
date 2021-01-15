import React from "react";
import "../sass/Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="info-box-footer">
            <div className="Title-box">
              <h1 className="hype-name">
                <span>HYPE</span>KICKS
              </h1>
              <p className="about-hypekicks">
                Discover the world’s top Sneakers & Prices.
              </p>
            </div>
            <div className="social-media">
              {/* <Link to="/aboutus" className="About-us">
                About Us
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
