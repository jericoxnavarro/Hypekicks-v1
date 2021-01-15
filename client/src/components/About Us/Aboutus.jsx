import React from "react";
import "../../sass/Aboutus.scss";
import Jerico from "./Image/Memoji-18.png";
import Ian from "./Image/Memoji-04.png";
import Cha from "./Image/Memoji-22.png";
import Cards from "./Cards";
const jericoWork =
  "Jerico is the lead developer of this web app. He is the one who plan, design, and chooses a stack for development. He designs the UI/UX using AdobeXD. He also uses React JS & Sass for the frontend and Node JS & Express JS for creating a RESTful API for the Database he uses MongoDB. In Deployment, he uses DigitalOcean(Droplet Ubuntu) for Hosting, Nginx for Web Server, Namecheap for Domain, and Lets Encrypt for SSL Certificate.";
const ianWork =
  "Jeremiah is the one who helps create a RESTful API using Node JS and Express JS. He develops the validation in Hypekicks API and He is the one who writes the Popular routes. He also help build some UI components. He also test the API using jest.";
const chaWork =
  "Charissa is the one who created the wireframes and helps design a UI/UX in Adobe XD. She also helps design some UI Components.";

const Aboutus = () => {
  return (
    <>
      <div className="main-about-us">
        <div className="container">
          <h1 className="Title">
            Our Awesome <span>Team</span>
          </h1>
          <div className="Team">
            <Cards
              name="Jeremiah Raposas"
              role="BackEnd Developer"
              img={Ian}
              work={ianWork}
            />
            <Cards
              name="Jerico Navarro"
              role="Main Developer"
              img={Jerico}
              work={jericoWork}
            />
            <Cards
              name="Charissa Cadaoas"
              role="UI/UX Designer"
              img={Cha}
              work={chaWork}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
