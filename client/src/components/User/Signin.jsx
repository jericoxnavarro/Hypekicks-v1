import React from "react";
import "../../sass/Signin.scss";
import Cookies from "universal-cookie";

const Signin = () => {
  const cookies = new Cookies();

  const submit = (e) => {
    e.preventDefault();
    let formData = [];

    const data = new FormData(e.target);
    data.forEach(function (value, key) {
      formData.push(value);
    });

    fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: formData[0],
        password: formData[1],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        cookies.set("token", json.token, {
          expires: new Date(Date.now() + 55920000),
        });
        console.log(json);
      });
  };
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
          <form className="signin-form" onSubmit={submit}>
            <h1 className="signin-bigtext">Sign in to Hypekicks</h1>
            <label className="email-label">
              Username
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
