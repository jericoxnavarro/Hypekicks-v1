import React from "react";
import { useHistory, Link } from "react-router-dom";
import "../../sass/Signin.scss";
import Cookies from "universal-cookie";
import { UserContext } from "../User.context";

const Signin = () => {
  const cookies = new Cookies();
  const { _uid, token, logged_in } = React.useContext(UserContext);
  const [status, setStatus] = React.useState("");
  const [onload, setOnload] = React.useState("");
  const [userid, setUserid] = _uid;
  const [usertoken, setUsertoken] = token;
  const [logged_In, setLogged_In] = logged_in;
  let history = useHistory();

  const submit = (e) => {
    setOnload("1");
    e.preventDefault();
    let formData = [];

    const data = new FormData(e.target);
    data.forEach(function (value, key) {
      formData.push(value);
    });

    if (formData[0] === "") {
      setOnload("");
      return setStatus("Please Enter your username or email.");
    } else if (formData[0].length < 6) {
      setOnload("");
      return setStatus("Username must be 6 characters or more.");
    } else {
      setStatus("");
    }

    if (formData[1] === "") {
      setOnload("");
      return setStatus("Please Enter your password.");
    } else if (formData[1].length < 8) {
      setOnload("");
      return setStatus("Password must be 8 characters or more.");
    } else {
      setStatus("");
    }

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
        if (json.status === "none") {
          setStatus(
            "We couldn’t find an account matching the username and password you entered. Please check your username and password and try again."
          );
          setOnload("");
        } else {
          const date = new Date(Date.now() + 55920000);
          setUserid(json._id);
          setUsertoken(json.token);
          setLogged_In(json.logged_in);
          cookies.set("token", json.token, {
            expires: date,
          });
          cookies.set("_id", json._id, {
            expires: date,
          });
          cookies.set("logged_in", json.logged_in, { expires: date });
          setStatus("done");
          setOnload("");
          history.push("/");
        }
      });
  };

  const Status = () => {
    if (status === "done") {
      return (
        <div className="status-message success">Sign in successfully.</div>
      );
    } else if (status !== "") {
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
          Sign in
        </button>
      );
    }
  };

  return (
    <main className="main-signin">
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
      <div className="hypekicks-signin">
        <div className="sign-up">
          <p className="not-member">Not a member?</p>
          <Link to="/sign-up" className="sign-up-now">
            Sign up now
          </Link>
        </div>
        <div className="container">
          <form noValidate className="signin-form" onSubmit={submit}>
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
              <Onload />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
