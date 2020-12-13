import React, { useState, createContext } from "react";
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

  return (
    <UserContext.Provider
      value={{ _uid: [userid, setUserid], token: [usertoken, setUsertoken] }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
