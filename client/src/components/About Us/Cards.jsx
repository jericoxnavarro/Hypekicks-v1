import React from "react";
import "../../sass/Cards.scss";

const Cards = ({ img, name, role, work }) => {
  const [show, setShow] = React.useState(true);
  return (
    <>
      <div
        style={{
          display: show === true ? "block" : "none",
          height: role === "Main Developer" ? "92%" : "80%",
          width: role === "Main Developer" ? "34%" : "30%",
        }}
        className="Person"
      >
        <div className="memoji">
          <img src={img} alt="Jerico" className="img" />
        </div>
        <div className="info">
          <h2 className="Name">{name}</h2>
          <p className="Position">{role}</p>
          <div onClick={() => setShow(false)} className="btn">
            Check Work
          </div>
        </div>
      </div>
      <div
        style={{
          display: show === true ? "none" : "block",
          height: role === "Main Developer" ? "95%" : "80%",
          width: role === "Main Developer" ? "34%" : "30%",
        }}
        className="Person"
      >
        <div
          style={{
            height: "100%",
            "padding-top": "40px",
            "padding-bottom": "40px",
          }}
          className="info"
        >
          <h2 style={{ "margin-bottom": "10px" }} className="Name">
            {role}
          </h2>
          <div className="Work">
            <p style={{ fontSize: ".65rem" }} className="Position">
              {work}
            </p>
          </div>
          <div onClick={() => setShow(true)} className="btn">
            Back
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
