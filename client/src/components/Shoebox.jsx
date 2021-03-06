import React, { useContext, useState, useEffect } from "react";
import "../sass/Shoebox.scss";
import Links from "./Scripts/Imagelinks";
import Brandlogo from "./Scripts/Brandlogo";
import { UserContext } from "./User.context";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Shoebox = ({ product }) => {
  // Styles states
  const [infoboxDisplay, setinfoboxDisplay] = useState("none");
  const [visibilityBTN, setvisibilityBTN] = useState(1);
  const [pointerBTN, setpointerBTN] = useState("auto");

  // Function states
  const [images, setImages] = useState(product.thumbnail);
  const [link, setLink] = useState(0);
  const imgLINKS = Links(product.thumbnail, product.shoeName);
  const { _uid, token, logged_in } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [userid] = _uid;
  const [usertoken] = token;
  const [logged_In] = logged_in;

  useEffect(() => {
    let Links = imgLINKS[link];
    setImages(Links);
    fetch(Links).then((res) => {
      if (res.status === 404) {
        setImages(product.thumbnail);
        setvisibilityBTN(0);
        setpointerBTN("none");
      }
    });
  }, [link]);

  let buttons = [];
  for (let i = 0; i <= 35; i++) {
    buttons.push(
      <button
        key={i}
        onMouseEnter={() => setLink(i)}
        style={
          link === i
            ? {
                borderRadius: "50%",
                transform: "scale(2.1)",
                backgroundColor: "#7de89d",
                zIndex: "12",
              }
            : {
                borderRadius: "0%",
                transform: "scale(1)",
                backgroundColor: "#043353",
              }
        }
        className="circle-btn"
      ></button>
    );
  }

  const Favorite = () => {
    if (logged_In === "Yes") {
      return (
        <form className="form-favorite" onSubmit={(e) => submit(e)}>
          <button className="addfav-btn">Add Favorite</button>
          <select className="select-seller" name="seller">
            <option value="stockX">stockX</option>
            <option value="goat">goat</option>
            <option value="flightClub">flightClub</option>
            <option value="stadiumGoods">stadiumGoods</option>
          </select>
        </form>
      );
    } else {
      return <></>;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = [];

    const data = new FormData(e.target);
    data.forEach(function (value, key) {
      formData.push(value);
    });

    fetch(`/api/user/updatefavorites/${userid}`, {
      method: "PUT",
      body: JSON.stringify({
        sneaker: {
          shoeName: product.shoeName,
          brand: product.brand,
          styleID: product.styleID,
          thumbnail: product.thumbnail,
          store: formData[0],
          price: product.retailPrice,
          description: product.description,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": usertoken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const statusCode = json.status.toString();
        setStatus(statusCode);
      });
  };

  const Status = () => {
    if (status === "409") {
      return (
        <div className="status-message error">
          This shoe is already exist in your favorites.
        </div>
      );
    } else if (status === "200") {
      return (
        <div className="status-message success">
          Successfully added to your favorites.
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <main id={product._id} className="main-shoebox">
        <div className="image-box">
          <div className="brand">
            <img
              src={Brandlogo(product.brand)}
              className="brand-logo"
              alt={product.brand}
            />
          </div>
          <img className="shoe" src={product.thumbnail} alt={product.styleID} />
        </div>
        <div className="info-box">
          <h2 className="shoe-name">{product.shoeName}</h2>
          <div className="price-btn">
            <h2 className="price">${product.lowestResellPrice.stockX}</h2>
            <button
              onClick={() => setinfoboxDisplay("flex")}
              className="addbtn"
            >
              Check
            </button>
          </div>
        </div>
      </main>

      <div className="shoe-info-box" style={{ display: infoboxDisplay }}>
        <Status />
        <div className="info-box">
          <div className="shoe-images">
            <img className="shoe" src={images} alt={product.styleID} />
            <i
              onClick={() => {
                setinfoboxDisplay("none");
                setStatus("");
              }}
              className="fad fa-times-circle"
            ></i>
            <div
              style={{ opacity: visibilityBTN, pointerEvents: pointerBTN }}
              className="btns"
            >
              {buttons}
            </div>
          </div>
          <div className="shoe-infos">
            <h1 className="shoename">{product.shoeName}</h1>
            <Favorite />
            <div className="resellers">
              <div className="resellers-logo">
                <a
                  onClick={(e) => {
                    window.open(`${product.resellLinks.stockX}`, "_blank");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 235.82 106.49"
                  >
                    <defs>
                      <style></style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Crop_Marks" data-name="Crop Marks">
                        <polygon
                          className="cls-1"
                          points="176.75 60.62 144.57 106.49 178.92 93.55 188.55 78.5 176.75 60.62"
                        />
                        <polygon
                          className="cls-1"
                          points="201.92 58.47 201.95 58.43 195.77 49.73 203.43 56.2 223.33 25.81 230.73 26.76 231.17 0 194.19 22.08 203.33 23.25 190.19 41.86 175.2 20.63 144.57 6.8 178.46 58.48 178.45 58.49 190.19 76.37 190.19 76.37 201.46 93.55 235.82 106.49 201.92 58.47"
                        />
                        <path
                          className="cls-1"
                          d="M15.27,54.71c-3-1.18-5.56-2.21-5.56-3.84,0-2.52,3.08-2.72,4-2.72a10.36,10.36,0,0,1,7,2.46l1.08,1.08,3.52-6.59-.55-.59c-.15-.15-3.65-3.83-10.95-3.83S1.3,44.82,1.3,50.75c0,6.61,5.82,9,10.49,10.84,3,1.22,5.65,2.28,5.65,4s-2.05,2.78-4.08,2.78A12.42,12.42,0,0,1,5.17,65l-1-1L0,70.22l.61.66a17.91,17.91,0,0,0,12.75,5c7.35,0,12.49-4.22,12.49-10.26,0-6.69-5.87-9-10.58-10.87"
                        />
                        <path
                          className="cls-1"
                          d="M47.69,49.05V41.18H38.5V31.51l-9.12,1.55V64a26.11,26.11,0,0,0,.46,5.22,8.85,8.85,0,0,0,1.75,3.9,7.64,7.64,0,0,0,3.51,2.34,17.5,17.5,0,0,0,5.59.76A28.8,28.8,0,0,0,44.12,76,11,11,0,0,0,47.47,75l.22-.1v-8l-.62.45a4.67,4.67,0,0,1-1.92.73,13.12,13.12,0,0,1-2.37.24c-1.71,0-2.85-.43-3.4-1.28a7,7,0,0,1-.88-3.76V49.05Z"
                        />
                        <path
                          className="cls-1"
                          d="M85.18,50.91a17,17,0,0,0-9.86-9.29,21.09,21.09,0,0,0-14.47,0A17,17,0,0,0,51,50.91a19.4,19.4,0,0,0,0,14.72,17,17,0,0,0,9.86,9.29,21.09,21.09,0,0,0,14.47,0,17,17,0,0,0,9.86-9.29,19.28,19.28,0,0,0,0-14.72m-7.67,7.36a10.57,10.57,0,0,1-.63,3.62A9.45,9.45,0,0,1,61.17,65a9.07,9.07,0,0,1-1.87-3.08,10.56,10.56,0,0,1,0-7.24,9.07,9.07,0,0,1,1.87-3.08A9.79,9.79,0,0,1,72,49.44a9.59,9.59,0,0,1,3,2.13,9.26,9.26,0,0,1,1.86,3.07,10.48,10.48,0,0,1,.64,3.63"
                        />
                        <path
                          className="cls-1"
                          d="M112.9,64.92a7.49,7.49,0,0,1-2.71,2.22,7.88,7.88,0,0,1-3.45.76A9.17,9.17,0,0,1,99.82,65,9.07,9.07,0,0,1,98,61.89a10.59,10.59,0,0,1,0-7.25,9.12,9.12,0,0,1,1.87-3.07,9.17,9.17,0,0,1,6.92-2.93,6.2,6.2,0,0,1,3.08.85,12.83,12.83,0,0,1,3,2.37l.27.28,6.32-6.32-.25-.27a15.14,15.14,0,0,0-5.82-4,19.53,19.53,0,0,0-13.81,0,17,17,0,0,0-9.86,9.29,19.28,19.28,0,0,0,0,14.72,17,17,0,0,0,9.86,9.29,20.51,20.51,0,0,0,7.24,1.28,18.38,18.38,0,0,0,2.7-.25,20.47,20.47,0,0,0,3.26-.82,20,20,0,0,0,3.38-1.49,13.47,13.47,0,0,0,3-2.22l.26-.26-6.13-6.6Z"
                        />
                        <polygon
                          className="cls-1"
                          points="140.42 56.76 155.14 41.18 143.35 41.18 131.03 54.43 131.03 23.52 121.91 25.08 121.91 75.36 131.03 75.36 131.03 58.87 143.89 75.36 155.97 75.36 140.42 56.76"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
                <a
                  onClick={(e) => {
                    window.open(`${product.resellLinks.goat}`, "_blank");
                  }}
                >
                  <svg
                    className="Logo__SvgLogo-sc-16hbji1-0 fcjFOZ"
                    width="368px"
                    height="84px"
                    version="1.1"
                    id="GOAT_logo"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 368 84"
                  >
                    <g>
                      <path d="M42.2,50.7h23.4v12.2c-5.4,6.2-13,10.5-23.3,10.5c-17.7,0-30.4-13.2-30.4-31.4c0-18.4,12.8-31.4,30.4-31.4 c10.8,0,19.9,5.4,24.5,12.2l8.5-7.6C67.7,5.8,56.7,0,42.3,0C18.6,0,0,17.8,0,42s18.6,42,42.2,42c15.5,0,27.9-7.7,35.1-18.2V40.2 H42.2V50.7z"></path>
                      <path d="M148.2,0C124.6,0,106,17.8,106,42s18.6,42,42.2,42c23.7,0,42.2-17.8,42.2-42S171.9,0,148.2,0z M148.2,73.4 c-17.5,0-30.4-13.2-30.4-31.4c0-18.4,12.8-31.4,30.4-31.4c17.5,0,30.5,13,30.5,31.4C178.7,60.2,165.8,73.4,148.2,73.4z"></path>
                      <path d="M243.2,1.7l-34.9,80.5h11.8l9.8-22.3h38.2l9.8,22.3h11.8L254.9,1.7H243.2z M234.5,49.4L249,16.1h0.1l14.4,33.3H234.5z"></path>
                      <polygon points="300.1,1.7 300.1,12.3 327.7,12.3 327.7,82.3 339.5,82.3 339.5,12.3 367,12.3 367,1.7 	"></polygon>
                    </g>
                  </svg>
                </a>
                <a
                  onClick={(e) => {
                    window.open(`${product.resellLinks.flightClub}`, "_blank");
                  }}
                >
                  <svg
                    width="126"
                    height="24"
                    viewBox="0 0 126 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M26.9111 0.196289L21.875 23.3701H27.0667L32.0833 0.196289H26.9111Z" />
                    <path d="M13.7861 5.19301L14.8556 0.196289H5.03611L0 23.3701H5.19167L7.25278 13.8291H11.9L13.0083 8.71432H8.36111L9.11944 5.19301H13.7861Z" />
                    <path d="M17.5385 18.4914L21.5052 0.196289H16.333L11.2969 23.3701H20.6108L21.6802 18.4914H17.5385Z" />
                    <path d="M55.2226 0.196289L53.4142 8.5176H51.3531L53.142 0.196289H47.9698L42.9531 23.3701H48.1253L50.2253 13.6717H52.3059L50.2059 23.3701H55.3781L60.3948 0.196289H55.2226Z" />
                    <path d="M61.6774 0.196289L60.5108 5.52744H63.2719L59.4219 23.3701H64.5941L68.4635 5.52744H71.0497L72.1969 0.196289H61.6774Z" />
                    <path d="M37.2752 13.6525H38.753L37.9169 17.5082C37.8002 18.059 37.4308 18.2754 37.0224 18.2754C34.8058 18.2754 35.4474 12.4525 37.3724 8.16393C38.5197 5.60656 40.5808 5.19344 41.7669 5.2918C42.778 5.39016 43.828 5.58688 44.7224 5.84262C45.053 4.34754 45.5197 2.18361 45.8891 0.491803C44.9363 0.255738 43.3419 0 42.4086 0C38.5391 0 35.7586 1.53443 33.6197 4.64262C31.6169 7.5541 30.2363 12.9639 30.2363 16.4852C30.2363 21.0492 31.9474 23.5475 37.003 23.5475C38.5002 23.5475 40.0947 23.4689 41.7086 22.8984L44.8391 8.49836H38.403L37.2752 13.6525Z" />
                    <path d="M91.4467 18.4914L95.4134 0.196289H90.2412L85.2051 23.3701H94.519L95.569 18.4914H91.4467Z" />
                    <path d="M108.189 0.196289C106.828 6.4717 104.709 16.2487 104.534 17.0356C104.281 18.216 103.698 18.4127 102.92 18.4127C102.025 18.4127 101.85 17.9012 102.025 17.0356C102.103 16.7012 104.378 6.19629 105.681 0.196289H100.567C99.5365 4.99629 97.4365 14.6356 96.8726 17.2324C96.1143 20.734 97.0281 21.9143 97.942 22.6815C99.0698 23.6258 100.625 23.7045 101.695 23.7045C104.184 23.7045 105.467 23.2717 106.575 22.4258C107.684 21.5996 108.928 20.4586 109.531 17.6455C109.959 15.6586 112.098 5.74383 113.303 0.196289H108.189V0.196289Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M121.47 0.196289C124.581 0.196289 125.845 1.57334 125.845 3.85531C125.845 6.64875 124.62 9.44219 122.792 10.5832C123.122 10.9373 124.017 11.9012 124.017 13.7307C124.017 16.1897 122.928 20.675 120.147 22.3865C118.67 23.2914 117.367 23.3701 114.139 23.3701H109.647L114.684 0.196289H119.7H121.47ZM118.553 8.61596H117.872L118.709 4.7799H119.35C120.206 4.7799 120.4 5.6258 120.4 6.05858C120.42 7.21924 119.7 8.61596 118.553 8.61596ZM118.164 17.0947C117.95 17.8619 117.367 18.452 116.57 18.452H115.734L116.803 13.4946H117.639C118.339 13.4946 118.67 14.0848 118.67 14.616C118.67 15.1274 118.378 16.3865 118.164 17.0947Z"
                    />
                    <path d="M85.5749 0.0195312C83.6888 0.0195312 80.9471 0.353957 78.7888 3.79658C77.1166 6.47199 75.4443 15.3638 75.4443 17.8425C75.4443 23.0949 79.2749 23.4884 82.0166 23.4884C82.9693 23.4884 83.6499 23.39 83.8443 23.3507L85.0499 17.8425C84.5249 17.8818 83.3777 17.9212 82.5027 17.8622C80.4804 17.6851 80.6749 15.9343 80.9277 14.3999C81.1804 12.8851 81.686 10.5638 82.0943 9.08838C82.4249 7.90806 82.6971 6.76707 83.6888 5.96052C84.7388 5.11461 86.236 5.44904 87.4416 5.6851L88.6277 0.235925C87.9666 0.157236 86.761 0.0195312 85.5749 0.0195312Z" />
                  </svg>
                </a>
                <a
                  onClick={(e) => {
                    window.open(
                      `${product.resellLinks.stadiumGoods}`,
                      "_blank"
                    );
                  }}
                >
                  <svg
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    space="preserve"
                    viewBox="0 0 216 104.2"
                    version="1.1"
                    y="0px"
                    x="0px"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path d="m193.8 20l-12 24.8h-0.1l-2.8-24.8h-12.3l-7 37.6h0.4c-2.4 1.6-4.3 3.8-5.4 6.6-0.2-0.5-0.4-0.9-0.7-1.4-1.3-2.6-3.3-4.3-5.3-5.3 2.3-0.7 4.4-1.8 6.1-3.3 2.8-2.4 4.7-5.2 5.9-11.5l4.2-22.7h-9.6l-4.2 22.7c-0.6 3-1.3 7.2-6.1 7.2-4.7 0-4-4.6-3.5-7.2l4.2-22.7h-9.6l-4.2 22.7c-1 5.5-0.9 8.2 1.6 11.6 0.4 0.6 1 1.1 1.5 1.5h-7.5l6.6-35.8h-9.6l-6.9 37.3c-2.5-1.4-5.4-2.2-8.8-2.2h-0.1c6.5-3.3 10-9.5 11.3-16.4 0.8-4.1 0.6-8.1-1.3-11.7-3.6-7-11.1-7-15.3-7h-12.5l-5.5 29.6-6.3-29.6h-7.6l-19.7 33.5 4.7-25.1h7.5l4.8-8.4h-28l-1.6 8.4h7.7l-5 27.2c-2.2-0.9-4.6-1.5-7.2-1.5-0.5 0-1 0-1.5 0.1 0.2-0.1 0.3-0.2 0.5-0.3 3.3-2.5 4.8-6.3 5.4-9.9 1-6-2.6-8.6-7.5-10.1l-2.4-0.9c-1.6-0.5-4-1.4-3.7-3.5s2.8-3.1 4.6-3.1c2.9-0.1 5.2 0.4 6.7 1.8l1.6-7.6c-2.7-1.6-5.6-2.3-8.4-2.3-7.4 0-13.5 4.9-14.7 12.4-1.1 7.2 2.6 8.7 8.3 10.4 2 0.6 5.6 1.5 5.2 4.2-0.4 2.6-3 3.7-5.3 3.7-3.3 0-5.8-1.7-7.9-3.8l-5.3 7.7c3.3 2.6 7.7 4.2 12.3 4.2h0.1c-5.9 3.4-10.5 9.2-11.8 16.1-2 10.8 4.9 19.7 16.3 19.7 8.4 0 17.2-4.9 21.6-13.5 0.7 7.7 6.6 14.2 16.4 14.2 8.5 0 16-4.8 20.2-11.4 1.7 6.5 7.3 11.6 16 11.6 8 0 15.2-4.3 19.6-10.3l-1.8 9.6h13.2c14.2 0 20.9-8.6 22.8-18.8 1.5 1.6 3.9 2.4 6.8 3.3 2 0.6 5.6 1.5 5.2 4.2-0.4 2.6-3 3.7-5.2 3.7-3 0-5.5-1.6-7.5-3.5-1.5 3.2-2.7 4.5-5 6.7 3.3 2.4 7 4.9 11.5 4.9 3.7 0 7.8-1 11-3.5 3.3-2.5 4.8-6.3 5.4-9.9 0.9-6-2.6-8.6-7.5-10.1l-2.3-0.7c-1.6-0.5-4-1.4-3.7-3.5s2.8-3.1 4.6-3.1c2.3 0 4.4 1 6 2.4l5-7.4c-0.3-0.2-0.7-0.4-1.1-0.5h4.2l13.3-28.3 0.1 0.1-5.5 28.2h8.8l7-37.6h-12.4zm-95 8.4h4.2c4.3 0 5.9 1.8 6.7 3.5 1 2.1 0.9 4.8 0.5 7-1 5.3-4 10.3-11.1 10.3h-4.1l3.8-20.8zm-25.8 3.3h0.1l1.5 12.9h-7.9l6.3-12.9zm-21.1 35.1c-0.8 1.4-1.5 2.8-2 4.2h-21l-1.4 7.7h11.2c-1.7 3.7-5.3 6.1-10.1 6.1-4.7 0-9.7-3.4-8.2-11.3 1.4-7.5 7.6-11 12.3-11 4.1 0 6.4 2.2 7.4 4.9h10.8c-0.4-3.9-2.5-7.3-5.6-9.8h14.4l3-5.4h13.1l0.5 3c-1.2-0.2-2.4-0.4-3.8-0.4-10.6 0-17.8 7.1-20.6 12zm27.2 7.6c-0.9 4.8-5.4 11-12.2 11-6.5 0-9.4-5.4-8.3-11.2 1-5.3 5.6-11 12.3-11 6.9 0.1 9.1 6.3 8.2 11.2zm9.4-7.9c-0.9-3.7-3.1-6.8-6.3-8.9h14.8c0.5 0 1 0 1.5-0.1-4.8 2.4-8.1 6-10 9zm26.8 8.2c-0.9 4.8-5.4 11-12.2 11-6.5 0-9.4-5.4-8.3-11.2 1-5.3 5.6-11 12.3-11 7 0 9.1 6.3 8.2 11.2zm2.8-17.1h7.7l-1.5 7.9c-1.1-3.3-3.2-6.1-6.2-7.9zm27.5 17.1c-1 5.3-4 10.3-11.1 10.3h-4.1l3.8-20.7h4.2c4.3 0 5.9 1.8 6.7 3.5 0.9 2 0.9 4.7 0.5 6.9zm23.2-19.6l4.5-25.7 0.1-0.1 2.7 27.2c-2.3-0.8-4.9-1.3-7.3-1.4z" />
                      <path
                        className="st0"
                        d="m180 66.3c0-5.1 4.1-9.1 9.1-9.1 5.1 0 9.1 4 9.1 9.1 0 5-4 9.1-9.1 9.1-5 0-9.1-4.1-9.1-9.1zm1.5 0c0 4.2 3.4 7.6 7.6 7.6s7.6-3.4 7.6-7.6c0-4.3-3.4-7.6-7.6-7.6s-7.6 3.3-7.6 7.6zm7.4 1.1h-1.7v4.1h-1.6v-10.4h4.3c2 0 3.5 1.2 3.5 3.2 0 2.3-2.1 3.1-2.7 3.1l2.8 4.2h-1.9l-2.7-4.2zm-1.7-5v3.6h2.7c1.2 0 1.9-0.7 1.9-1.8 0-1.2-0.7-1.9-1.9-1.9h-2.7z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              <div className="resellers-price">
                <h2 className="res-price">
                  ${product.lowestResellPrice.stockX}
                </h2>
                <h2 className="res-price">${product.lowestResellPrice.goat}</h2>
                <h2 className="res-price">
                  ${product.lowestResellPrice.flightClub}
                </h2>
                <h2 className="res-price">
                  ${product.lowestResellPrice.stadiumGoods}
                </h2>
              </div>
            </div>
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shoebox;
