import React from "react";
import "../../sass/Signup.scss";

const Signup = () => {
  const [showstatus, setStatus] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    let formData = [];

    const data = new FormData(e.target);
    data.forEach(function (value, key) {
      formData.push(value);
    });

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
        console.log(json.status);
        if (json.status === "none") {
          setStatus(json.message);
          console.log(json.message);
        } else {
          setStatus(json.message);
        }
      });
  };
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
          <form className="signup-form" onSubmit={submit}>
            <h1 className="signup-bigtext">Sign up to Hypekicks</h1>
            <div className="name-username">
              <label className="name-label">
                Name
                <input required name="name" type="text" />
              </label>
              <label className="username-label">
                Usernames
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
            <p className="error">
              {"*" +
                showstatus.charAt(1).toUpperCase() +
                showstatus.replaceAll('"', "").slice(1)}
            </p>
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
