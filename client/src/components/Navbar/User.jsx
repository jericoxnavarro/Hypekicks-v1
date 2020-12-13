import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Guest = ({ name }) => {
  const [profile, setProfile] = useState(0);
  const [visibility, setVisibility] = useState("none");

  const removeCookies = () => {
    cookies.remove("_id");
    cookies.remove("token");
  };

  return (
    <>
      <div
        onMouseEnter={() => {
          setVisibility("auto");
          setProfile(1);
        }}
        className="profile-nav"
      >
        <div className="profile-pic">
          <img src="" className="profilepic" alt="Profile-Pic" />
        </div>
        <p className="user-fname">{name}</p>
      </div>

      <div
        onMouseLeave={() => {
          setVisibility("none");
          setProfile(0);
        }}
        style={{ pointerEvents: visibility, opacity: profile }}
        className="profile-nav-dropdown"
      >
        <nav className="navbar-profile">
          <ul className="nav-items-profile">
            <li className="nav-item-profile">
              <Link className="link-profile" to="/profile">
                <i className="fad fa-user-alt"></i>Profile
              </Link>
            </li>
            <li className="nav-item-profile">
              <Link className="link-profile" to="/jecoerror/profile">
                <i className="fad fa-user-edit"></i>Edit Profile
              </Link>
            </li>
            <li className="nav-item-profile">
              <Link className="link-profile" to="/jecoerror/account">
                <i className="fad fa-user-cog"></i>Account Settings
              </Link>
            </li>
            <li className="nav-item-profile">
              <Link onClick={removeCookies} className="link-profile" to="/">
                <i className="fad fa-sign-out-alt"></i>Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Guest;
