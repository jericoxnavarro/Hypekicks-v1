import React from "react";
import "../../sass/Signup.scss";

const Signup = () => {
  return (
    <main className="main-signup">
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
      <div className="hypekicks-signup">
        <div className="container">
          <form className="signup-form">
            <h1 className="signup-bigtext">Sign up to Hypekicks</h1>
            <div className="name-username">
              <label className="name-label">
                Name
                <input required name="name" type="text" />
              </label>
              <label className="username-label">
                Username
                <input required name="username" type="text" />
              </label>
            </div>
            <label className="email-label">
              Email
              <input required name="email" type="email" />
            </label>
            <label className="password-label">
              Password
              <input required name="password" type="password" />
            </label>
            <div className="wrapper">
              <input required className="terms" type="checkbox" name="terms" />
              <label className="terms-label">
                Creating an account means you’re okay with our Terms of Service.
              </label>
            </div>
            <div className="wrapper">
              <button type="submit" name="submit" className="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
