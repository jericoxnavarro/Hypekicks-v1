import React, { useState } from "react";
import { Link } from "react-router-dom";

const Guest = ({ name }) => {
  const [profile, setProfile] = useState(0);
  const [visibility, setVisibility] = useState("none");

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
          <img
            src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/79162681_3070225769722787_8615311949062389221_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGlZTKbG5yjzguMFTihdM9iE0yb-x_Ch6cTTJv7H8KHp22Fd0auo0Rzpv8vhIRbgDSlEP9VQUWc2oWn3nPZYf2w&_nc_ohc=tqrol7dxxYUAX-0saUo&_nc_ht=scontent.fmnl4-4.fna&oh=e79ee6b310328496a52d37e6222566f5&oe=5FD2F758"
            className="profilepic"
            alt="Profile-Pic"
          />
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
              <Link className="link-profile" to="/jecoerror">
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
              <Link className="link-profile" to="/">
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
