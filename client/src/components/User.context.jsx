import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const UserContext = createContext();

export const UserProvider = (props) => {
  const getCookie = (cookie) => {
    if (cookie) {
      return cookie;
    } else {
      return "";
    }
  };

  const [userid, setUserid] = useState(getCookie(cookies.get("_id")));
  const [usertoken, setUsertoken] = useState(getCookie(cookies.get("token")));
  const [logged_In, setLogged_In] = useState(
    getCookie(cookies.get("logged_in"))
  );
  const [user, setUser] = useState("");

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
  }, [userid, usertoken]);

  return (
    <UserContext.Provider
      value={{
        _uid: [userid, setUserid],
        token: [usertoken, setUsertoken],
        logged_in: [logged_In, setLogged_In],
        _User: [user, setUser],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
