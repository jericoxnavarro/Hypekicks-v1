import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../User.context";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Guest = () => {
  const [profile, setProfile] = useState(0);
  const [visibility, setVisibility] = useState("none");
  const { _User } = useContext(UserContext);
  const [user, setUser] = _User;
  let history = useHistory();

  const removeCookies = () => {
    cookies.remove("_id");
    cookies.remove("token");
    cookies.remove("logged_in");
    history.push("/");
    window.location.reload();
  };

  if (user !== "" && user.message !== "Access Denied Token is not Authorize") {
    const Profilepic = () => {
      if (user.user.picture) {
        return (
          <img
            src="user.user.picture"
            className="profilepic"
            alt="Profile-Pic"
          />
        );
      } else {
        return <div className="profilepic"></div>;
      }
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
            <Profilepic />
          </div>
          <p className="user-fname">{user.user.username}</p>
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
                <div onClick={removeCookies} className="link-profile">
                  <i className="fad fa-sign-out-alt"></i>Sign Out
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Guest;
