import React, { useState, useEffect } from "react";
import "../../sass/Profile.user.scss";
import Favorites from "./Favorites.user";

const Profile = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `http://localhost:3001/api/user/5fb521870cc05701769387c5`
      );
      const data = await response.json();
      setProducts(data.favorites);
    };
    getProducts();
  }, []);

  return (
    <>
      <main className="main-profile">
        <div className="container info">
          <div className="profile-info">
            <div className="profile-image">
              <img
                className="profile-pic"
                alt="User"
                src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/79162681_3070225769722787_8615311949062389221_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGlZTKbG5yjzguMFTihdM9iE0yb-x_Ch6cTTJv7H8KHp22Fd0auo0Rzpv8vhIRbgDSlEP9VQUWc2oWn3nPZYf2w&_nc_ohc=tqrol7dxxYUAX-0saUo&_nc_ht=scontent.fmnl4-4.fna&oh=e79ee6b310328496a52d37e6222566f5&oe=5FD2F758"
              />
            </div>
            <div className="profile-details">
              <h1 className="profile-name">Jerico Navarro</h1>
              <p className="profile-address">Philippines, Anonang Mayor</p>
              <button className="profile-edit">
                <i className="fad fa-cog"></i>Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="container fav">
          <div className="grid-main">
            {products.map((product) => (
              <div className="favorite-box">
                <Favorites product={product} />
              </div>
            ))}
          </div>
          <div className="space"></div>
        </div>
      </main>
    </>
  );
};

export default Profile;
