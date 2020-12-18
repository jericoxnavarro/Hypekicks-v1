import React from "react";
import { useHistory, Link } from "react-router-dom";
import "../../sass/Signup.scss";

const Signup = () => {
  const [status, setStatus] = React.useState("");
  const [onload, setOnload] = React.useState("");
  let history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    let formData = [];

    const data = new FormData(e.target);
    data.forEach(function (value, key) {
      formData.push(value);
    });

    if (formData[0] === "") {
      setOnload("");
      return setStatus("Please enter your Name.");
    } else if (formData[0].length < 6) {
      setOnload("");
      return setStatus("Name length must be at least 6 characters long.");
    } else {
      setStatus("");
    }

    if (formData[1] === "") {
      setOnload("");
      return setStatus("Please enter your username.");
    } else if (formData[1].length < 6) {
      setOnload("");
      return setStatus("Username length must be at least 6 characters long.");
    } else {
      setStatus("");
    }

    if (formData[2] === "") {
      setOnload("");
      return setStatus("Please Enter your email.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[2])) {
      setOnload("");
      return setStatus("Email is invalid.");
    } else {
      setStatus("");
    }

    if (formData[3] === "") {
      setOnload("");
      return setStatus("Please enter your address.");
    } else if (formData[3].length < 6) {
      setOnload("");
      return setStatus("Address length must be at least 6 characters long.");
    } else {
      setStatus("");
    }

    if (formData[4] === "") {
      setOnload("");
      return setStatus("Please Enter your password.");
    } else if (formData[4].length < 8) {
      setOnload("");
      return setStatus("Password length must be at least 8 characters long.");
    } else {
      setStatus("");
    }

    fetch("http://localhost:3001/api/user/create", {
      method: "POST",
      body: JSON.stringify({
        username: formData[1],
        password: formData[4],
        fullname: formData[0],
        email: formData[2],
        address: formData[3],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "none") {
          setStatus(json.message);
          console.log(23);
        } else {
          setStatus(json.message);
          history.push("/");
        }
      });
  };

  const Status = () => {
    if (status !== "") {
      return <div className="status-message">{status}</div>;
    } else {
      return <></>;
    }
  };

  const Onload = () => {
    if (onload !== "") {
      return (
        <div className="loading">
          <i className="fad fa-spinner-third"></i>
        </div>
      );
    } else {
      return (
        <button type="submit" name="submit" className="submit">
          Sign up
        </button>
      );
    }
  };

  return (
    <main className="main-signup">
      <Status />
      <div className="hypekicks-info">
        <div className="container">
          <Link to="/" className="hype-name">
            <span>HYPE</span>KICKS
          </Link>
          <p className="about-hypekicks">
            Discover the world’s top Sneakers & Prices.
          </p>
        </div>
      </div>
      <div className="hypekicks-signup">
        <div className="sign-in">
          <p className="member">Already a member?</p>
          <Link to="/sign-in" className="sign-in-now">
            Sign in
          </Link>
        </div>
        <div className="container">
          <form noValidate className="signup-form" onSubmit={submit}>
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
            <label className="address-label">
              Address
              <input required name="address" type="address" />
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
              <Onload />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
