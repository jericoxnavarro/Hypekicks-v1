import React from "react";
import { Link } from "react-router-dom";

const Guest = () => {
  return (
    <>
      <div className="profile-nav">
        <Link className="sign-in" to="/sign-in">
          Sign in
        </Link>
        <Link className="sign-up" to="/sign-up">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Guest;
