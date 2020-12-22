import React, { useContext, useState, useEffect } from "react";
import "../../sass/Profile.user.scss";
import Favorites from "./Favorites.user";
import { UserContext } from "../User.context";

const Profile = () => {
  const { _uid, token, _User } = useContext(UserContext);
  const [check, setCheck] = useState("favorites");
  const [imageform, setImageform] = useState("button");
  const [user, setUser] = _User;
  const [usertoken] = token;
  const [userid] = _uid;

  useEffect(() => {
    fetch(`http://localhost:3001/api/user/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": usertoken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setUser(json);
        } else {
          setUser("");
        }
      });
  }, [userid, usertoken, setUser]);

  const Picture = () => {
    if (user.user.picture) {
      return (
        <img
          className="profile-pic"
          alt="User"
          src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/79162681_3070225769722787_8615311949062389221_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGlZTKbG5yjzguMFTihdM9iE0yb-x_Ch6cTTJv7H8KHp22Fd0auo0Rzpv8vhIRbgDSlEP9VQUWc2oWn3nPZYf2w&_nc_ohc=tqrol7dxxYUAX-0saUo&_nc_ht=scontent.fmnl4-4.fna&oh=e79ee6b310328496a52d37e6222566f5&oe=5FD2F758"
        />
      );
    } else {
      return <div className="profile-pic"></div>;
    }
  };

  const Check = () => {
    if (check === "favorites") {
      return (
        <div className="grid-main">
          {user.user.favorites.map((product) => (
            <div className="favorite-box">
              <Favorites product={product} />
            </div>
          ))}
        </div>
      );
    } else if (check === "settings") {
      const Uploadimage = () => {
        if (imageform === "button") {
          return (
            <button
              onClick={() => setImageform("form")}
              className="upload-image-btn upload-btn"
            >
              Upload new image
            </button>
          );
        } else if (imageform === "form") {
          return (
            <form className="upload-image-form">
              <input type="file" accept="image/*" alt="Submit" />
              <button type="submit" className="upload-btn">
                Upload Now
              </button>
            </form>
          );
        }
      };
      return (
        <div className="main-settings">
          <h1 className="settings-text">
            <span className="name">{user.user.fullname}</span> <span>/</span>{" "}
            Settings
          </h1>
          <div className="upload-image">
            <Picture />
            <Uploadimage />
          </div>
        </div>
      );
    }
  };

  if (user !== "" && user.message !== "Access Denied Token is not Authorize") {
    return (
      <>
        <main className="main-profile">
          <div className="container info">
            <div className="profile-info">
              <div className="profile-image">
                <Picture />
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{user.user.fullname}</h1>
                <p className="profile-address">{user.user.address}</p>
                <button
                  onClick={() => setCheck("settings")}
                  className="profile-edit"
                >
                  <i className="fad fa-cog"></i>Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="container fav">
            <Check />
            <div className="space"></div>
          </div>
        </main>
      </>
    );
  } else {
    return <></>;
  }
};

export default Profile;
