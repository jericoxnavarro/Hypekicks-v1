import React from "react";

const Guest = ({ name }) => {
  return (
    <>
      <div className="profile-nav">
        <div className="profile-pic"></div>
        <p className="user-fname">{name}</p>
      </div>
    </>
  );
};

export default Guest;
