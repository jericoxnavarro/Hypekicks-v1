import React from "react";
import "../../sass/Signin.scss";

const Signin = () => {
  return (
    <main className="main-signin">
      <div className="hypekicks-info">
        <div className="container">
          <h1 className="hype-name">
            <span>HYPE</span>KICKS
          </h1>
          <p className="about-hypekicks">
            Discover the world’s top Sneakers & Prices.
          </p>
        </div>
      </div>
      <div className="hypekicks-signin">
        <div className="container">
          <form className="signin-form">
            <h1 className="signin-bigtext">Sign in to Hypekicks</h1>
            <label className="email-label">
              Username or Email Address
              <input required name="email-username" type="text" />
            </label>
            <label className="password-label">
              Password
              <input required name="password" type="password" />
            </label>
            <div className="btn-wrapper">
              <button type="submit" name="submit" className="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
